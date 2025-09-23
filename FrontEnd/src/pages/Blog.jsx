import React, { useMemo, useState } from "react";
import LayoutUser from "./LayoutUser";

const SAMPLE_POSTS = [
  {
    id: 1,
    title: "How to Keep Your Dog Healthy: Daily Routine",
    excerpt:
      "A simple daily routine can dramatically improve your dog's health. Here’s a practical checklist...",
    author: "Dr. Aisha Khan",
    date: "2025-08-10",
    tags: ["dog", "health", "routine"],
    img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Top 10 Foods for Cats (and Which to Avoid)",
    excerpt:
      "Feeding cats the right food keeps them energetic and reduces vet visits. Learn the best options and the no-nos.",
    author: "Vet Clinic",
    date: "2025-07-26",
    tags: ["cat", "nutrition"],
    img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Preparing Your Pet for a Vet Visit",
    excerpt:
      "Vet visits are stressful for pets and owners. These tips make the visit smoother for everyone.",
    author: "Dr. Naveen",
    date: "2025-06-14",
    tags: ["visits", "advice"],
    img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Seasonal Care: Protecting Pets in Summer",
    excerpt:
      "Hot weather brings risks — dehydration, heatstroke, and more. Here’s how to keep pets cool and safe.",
    author: "PetCare Team",
    date: "2025-05-30",
    tags: ["season", "safety"],
    img: "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=1200&q=80",
  },
  // add more posts as needed
];

export default function Blog() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 3;

  const tags = useMemo(() => {
    const s = new Set();
    SAMPLE_POSTS.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return ["all", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase();
    return SAMPLE_POSTS.filter((p) => {
      if (tag !== "all" && !p.tags.includes(tag)) return false;
      if (!lower) return true;
      return (
        p.title.toLowerCase().includes(lower) ||
        p.excerpt.toLowerCase().includes(lower) ||
        p.author.toLowerCase().includes(lower)
      );
    });
  }, [q, tag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  const featured = SAMPLE_POSTS[0];

  return (
    <LayoutUser>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">Our Blog</h1>
            <p className="text-gray-600 mt-2">
              Articles, tips and guides from vets and pet care professionals
            </p>
          </div>

          {/* Featured */}
          <div className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow">
              <div className="relative h-56 sm:h-72 md:h-80">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                  <span>{featured.author}</span>
                  <span>•</span>
                  <span>{featured.date}</span>
                  <div className="ml-auto flex gap-2">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {featured.title}
                </h2>
                <p className="text-gray-700 mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-3">
                  <a
                    href={`/blog/${featured.id}`}
                    className="text-green-600 font-medium hover:underline"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar: search + tags + stats */}
            <aside className="bg-white rounded-2xl p-6 shadow flex flex-col gap-6">
              <div>
                <label className="text-sm text-gray-600">Search</label>
                <input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search title, excerpt or author..."
                  className="mt-2 w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Filter by tag</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTag(t);
                        setPage(1);
                      }}
                      className={`text-sm px-3 py-1 rounded-full border ${
                        tag === t
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <div className="mb-1">Posts</div>
                <div className="text-lg font-semibold text-gray-900">
                  {SAMPLE_POSTS.length}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <div className="mb-1">Showing</div>
                <div className="text-lg font-semibold text-gray-900">
                  {filtered.length} results
                </div>
              </div>
            </aside>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {visible.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span>{p.author}</span>
                    <span>•</span>
                    <span>{p.date}</span>
                    <div className="ml-auto flex gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{p.excerpt}</p>
                  <a
                    href={`/blog/${p.id}`}
                    className="text-green-600 text-sm font-medium"
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPage((s) => Math.max(1, s - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg border ${
                page === 1
                  ? "text-gray-400 border-gray-200"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </div>
            <button
              onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg border ${
                page === totalPages
                  ? "text-gray-400 border-gray-200"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}
