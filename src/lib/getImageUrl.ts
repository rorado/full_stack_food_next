export const getImageUrl = async (imageFile: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathname", "profile_images");

  try {
    console.log("Uploading file:", imageFile.name);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = (await response.json()) as { url?: string; error?: string };

    if (!data.url) {
      console.log(data.error || "No URL returned");
    }

    return data.url || null;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
