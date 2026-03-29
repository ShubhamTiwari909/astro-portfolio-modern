export type DevToBlog = {
  title: string;
  description: string;
  published_at: string;
  url: string;
  cover_image: string | null;
  reading_time_minutes: number;
  user: {
    name: string;
    profile_image_90: string | null;
  };
};

export async function fetchDevToBlogs(apiKey: string | undefined): Promise<DevToBlog[]> {
  try {
    const response = await fetch(
      "https://dev.to/api/articles/me?page=1&per_page=6",
      {
        method: "GET",
        headers: {
          "api-key": apiKey ?? "",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(
        `Expected array of blogs, but received: ${typeof data}`,
      );
    }
    return data as DevToBlog[];
  } catch {
    return [];
  }
}

export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatBlogDateShort(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
    .format(date)
    .toUpperCase();
}
