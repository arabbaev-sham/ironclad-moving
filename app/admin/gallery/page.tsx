"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, Trash2, Star, ImageIcon, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  featured: boolean;
  created_at: string;
}

const CATEGORIES = ["move", "truck", "team", "before-after"] as const;

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState<typeof CATEGORIES[number]>("move");
  const [toast, setToast] = useState<string | null>(null);
  const [heroBg, setHeroBg] = useState("");
  const [savingHero, setSavingHero] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setItems(data); setLoading(false); });

    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "hero_bg_url")
      .maybeSingle()
      .then(({ data }) => { if (data?.value) setHeroBg(data.value); });
  }, []);

  const onDrop = useCallback(async (accepted: File[]) => {
    if (!accepted.length) return;
    setUploading(true);
    try {
      for (const file of accepted) {
        const ext = file.name.split(".").pop();
        const filename = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        // Upload to Supabase Storage bucket "ironclad-media"
        const { data: storageData, error: storageErr } = await supabase.storage
          .from("ironclad-media")
          .upload(filename, file, { cacheControl: "3600", upsert: false });

        if (storageErr) throw storageErr;

        const { data: urlData } = supabase.storage
          .from("ironclad-media")
          .getPublicUrl(storageData.path);

        const { data: row, error: dbErr } = await supabase
          .from("gallery")
          .insert([{
            title: uploadTitle || file.name.replace(/\.[^.]+$/, ""),
            url: urlData.publicUrl,
            category: uploadCategory,
            type: "photo",
            featured: false,
          }])
          .select()
          .single();

        if (dbErr) throw dbErr;
        setItems(prev => [row, ...prev]);
      }
      setUploadTitle("");
      showToast(`${accepted.length} photo(s) uploaded successfully`);
    } catch (err) {
      console.error(err);
      showToast("Upload failed — check Supabase Storage bucket setup");
    } finally {
      setUploading(false);
    }
  }, [uploadTitle, uploadCategory]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxSize: 10 * 1024 * 1024,
    onDrop,
  });

  const remove = async (item: GalleryItem) => {
    await supabase.from("gallery").delete().eq("id", item.id);
    setItems(prev => prev.filter(i => i.id !== item.id));
    showToast("Photo deleted");
  };

  const toggleFeatured = async (item: GalleryItem) => {
    const next = !item.featured;
    await supabase.from("gallery").update({ featured: next }).eq("id", item.id);
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, featured: next } : i));
  };

  const saveHeroBg = async () => {
    setSavingHero(true);
    await supabase.from("site_settings").upsert({ key: "hero_bg_url", value: heroBg });
    setSavingHero(false);
    showToast("Hero background saved — homepage will update within 60 seconds");
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-navy-700 border border-gold-500/30 text-white px-4 py-3 rounded-xl shadow-glass text-sm">
          <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
          {toast}
        </div>
      )}

      <h1 className="text-xl font-heading font-bold text-white">Gallery Management</h1>

      {/* Hero background setting */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-display font-semibold text-white mb-1 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-gold-400" />
          Hero Background Image
        </h2>
        <p className="text-text-muted text-xs mb-3">
          Enter a public image URL to use as the homepage hero background. Leave blank for the default photo.
        </p>
        <div className="flex gap-2">
          <input
            value={heroBg}
            onChange={e => setHeroBg(e.target.value)}
            className="input flex-1"
            placeholder="https://example.com/hero-photo.jpg"
          />
          <button onClick={saveHeroBg} disabled={savingHero} className="btn-gold whitespace-nowrap disabled:opacity-60">
            {savingHero ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </button>
        </div>
        <p className="text-text-muted text-xs mt-2">
          Tip: Upload a photo to Supabase Storage, copy the public URL, and paste it above.
        </p>
        {heroBg && (
          <div className="mt-3 relative h-24 rounded-xl overflow-hidden">
            <Image src={heroBg} alt="Hero preview" fill className="object-cover" sizes="400px" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-white bg-black/50 px-2 py-0.5 rounded">Preview</span>
            </div>
          </div>
        )}
      </div>

      {/* Upload section */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-display font-semibold text-white mb-3 flex items-center gap-2">
          <Upload className="w-4 h-4 text-gold-400" />
          Upload Photos
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="label">Title (optional)</label>
            <input value={uploadTitle} onChange={e => setUploadTitle(e.target.value)}
              className="input" placeholder="Moving day — Capitol Hill" />
          </div>
          <div>
            <label className="label">Category</label>
            <select value={uploadCategory} onChange={e => setUploadCategory(e.target.value as typeof CATEGORIES[number])}
              className="input cursor-pointer">
              {CATEGORIES.map(c => (
                <option key={c} value={c} className="bg-navy-800 capitalize">{c.replace("-", " ")}</option>
              ))}
            </select>
          </div>
        </div>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive ? "border-gold-400 bg-gold-500/10" : "border-white/15 hover:border-gold-500/40 hover:bg-white/3"
          }`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
              <p className="text-text-muted text-sm">Uploading to Supabase Storage...</p>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
              <p className="text-white text-sm font-display font-medium">
                {isDragActive ? "Drop photos here" : "Drag & drop photos here"}
              </p>
              <p className="text-text-muted text-xs mt-1">JPG, PNG, WebP · Max 10 MB each · Multiple files OK</p>
            </>
          )}
        </div>
      </div>

      {/* Gallery grid */}
      <div>
        <h2 className="font-display font-semibold text-white mb-3">
          Uploaded Photos ({items.length})
        </h2>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-gold-400 animate-spin" /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-text-muted text-sm glass rounded-2xl">
            No photos uploaded yet. Upload your first photo above.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {items.map((item) => (
              <div key={item.id} className="relative rounded-xl overflow-hidden aspect-square group bg-navy-800">
                <Image src={item.url} alt={item.title} fill className="object-cover" sizes="200px" />
                <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-between">
                    <button onClick={() => toggleFeatured(item)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                        item.featured ? "bg-gold-500 text-navy-950" : "bg-navy-700 text-text-muted hover:text-gold-400"
                      }`}
                      title={item.featured ? "Remove from featured" : "Mark as featured"}
                      aria-label="Toggle featured">
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => remove(item)}
                      className="w-7 h-7 bg-red-500/80 hover:bg-red-500 rounded-lg flex items-center justify-center cursor-pointer"
                      aria-label="Delete photo">
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="text-white text-xs font-display font-medium truncate">{item.title}</p>
                    <span className="text-text-muted text-[10px] capitalize">{item.category}</span>
                  </div>
                </div>
                {item.featured && (
                  <div className="absolute top-1.5 left-1.5">
                    <div className="w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center shadow-gold-sm">
                      <Star className="w-3 h-3 text-navy-950 fill-navy-950" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
