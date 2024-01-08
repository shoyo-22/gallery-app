async function toDataURL(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return window.URL.createObjectURL(blob);
}

export async function downloadImage(photoUrl, id) {
  const a = document.createElement('a');
  a.href = await toDataURL(photoUrl);
  a.download = `photo-${id}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
