import { ChangeEvent } from "react";

export const handleFileSelected = (event: ChangeEvent<HTMLInputElement>): Promise<string>[] => {
  if (!event.target.files) {
    throw new Error("No files exist.");
  }

  const files = Array.from(event.target.files);

  return files.map(
    (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => resolve(ev.target!.result as string);
        reader.onerror = () => reject;
        reader.readAsDataURL(file);
      })
  );
};
