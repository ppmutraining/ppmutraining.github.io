// Inisialisasi apiKey
const apiKey = "AIzaSyAxFDZzY3Wd23YdS4N4kvNV1v_KVv5neeg";

// Ambil parameter 'postId' dari URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

if (postId) {
  async function fetchPostDetails() {
    try {
      // URL API Blogger Google untuk detail posting berdasarkan postId
      const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/6390758224323593936/posts/${postId}?key=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Gagal mengambil detail posting");
      }

      const postDetail = await response.json();

      // Tampilkan detail postingan di halaman "blog-details.html"
      //   document.getElementById("post-image").src =
      //     postDetail.content.match(/src="([^"]+)"/)[1];
      document.getElementById("post-date").textContent = new Date(
        postDetail.published
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      document.getElementById("post-title").textContent = postDetail.title;
      document.getElementById("post-content").innerHTML = postDetail.content;
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      // Tampilkan pesan kesalahan jika diperlukan
    }
  }

  fetchPostDetails();
} else {
  // Tampilkan pesan kesalahan jika postId tidak ditemukan dalam URL
  console.error("Parameter 'postId' tidak ditemukan dalam URL.");
}
