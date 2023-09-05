// import {apikey} from"https://christyuda.github.io/apikeyppmu/apikey.js";
async function fetchData() {
  try {
    // URL API Blogger Google
    const apiUrl =
      "https://www.googleapis.com/blogger/v3/blogs/6390758224323593936/posts";

    // API key
    const apiKey = "AIzaSyAxFDZzY3Wd23YdS4N4kvNV1v_KVv5neeg";

    // Gabungkan URL API dengan query parameter
    const apiUrlWithParams = `${apiUrl}?key=${apiKey}`;

    const response = await fetch(apiUrlWithParams);

    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error; // Meneruskan error untuk penanganan lebih lanjut jika diperlukan
  }
}

fetchData()
  .then((data) => {
    // Ambil data yang diperlukan dari respons API
    const posts = data.items; // Menggunakan data.items jika API mengembalikan daftar posting

    // Ambil elemen kontainer tempat Anda ingin menampilkan konten
    const blogContentContainer = document.getElementById(
      "blog-content-container"
    );

    // Loop melalui setiap posting dan tambahkan HTML ke dalam elemen kontainer
    posts.forEach((post) => {
      // Ambil gambar, judul, dan tautan posting
      const imageUrl = post.content.match(/src="([^"]+)"/)[1]; // Mengambil URL gambar dari konten
      const title = post.title;
      const url = post.url;
      const content = post.content.replace(/<[^>]*>/g, "");
      const selfLink = post.selfLink; // Tautan untuk detail posting
      const postId = post.id; // Pindahkan ini ke sini untuk mendapatkan postId

      // Ganti postLink ke dalam loop
      const postLink = `blog-details.html?postId=${postId}`;

      // Ambil tanggal posting (gunakan library untuk memformat tanggal jika diperlukan)
      const date = new Date(post.published).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Buat elemen HTML untuk setiap posting
      const postHTML = `
        <div class="single-blog-content">
          <div class="inner-box">
            <figure class="image-box"><a href="${postLink}"><img src="${imageUrl}" alt=""></a></figure>
            <div class="lower-content">
              <div class="upper-box">
                <div class="post-date"><i class="fas fa-calendar-alt"></i>${date}</div>
                <h3><a href="${url}">${title}</a></h3>
                <div class="text">${content}</div>
              </div>
              <div class="lower-box clearfix">
                <div class="left-content pull-left">
                  <figure class="admin-image"><img src="images/resource/admin-1.png" alt=""></figure>
                  <span class="admin-name">by Yudacihuy</span>
                </div>
                <ul class="right-content pull-right">
                  <li><a href="#">25 &nbsp;<i class="far fa-comments"></i></a></li>
                </ul>
              </div>            
            </div>
          </div>
        </div>
      `;

      // Tambahkan posting HTML ke dalam elemen kontainer
      blogContentContainer.innerHTML += postHTML;
    });
  })
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  });

//pagenation
// Ambil elemen-elemen yang diperlukan
const blogContentContainer = document.getElementById("blog-content-container");
const pagination = document.getElementById("pagination");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");

// Jumlah posting per halaman
const postsPerPage = 3;

// Data posting Anda
const posts = []; // Isi dengan data posting Anda

// Fungsi untuk memuat posting berdasarkan halaman yang dipilih
function loadPosts(page) {
  // Hitung indeks posting yang akan ditampilkan
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // Hapus konten yang ada di kontainer blog
  blogContentContainer.innerHTML = "";

  // Loop melalui posting yang sesuai dengan halaman yang dipilih
  for (let i = startIndex; i < endIndex && i < posts.length; i++) {
    const post = posts[i];
    // Buat elemen HTML untuk posting dan tambahkan ke dalam kontainer blog
    // (mirip dengan kode yang Anda punya sebelumnya)
  }
}

// Fungsi untuk memperbarui tombol navigasi berdasarkan halaman yang sedang aktif
function updatePaginationButtons(page) {
  // Hapus kelas 'active' dari semua tombol halaman
  const pageLinks = pagination.querySelectorAll(".page-link");
  pageLinks.forEach((link) => link.classList.remove("active"));

  // Tambahkan kelas 'active' ke tombol halaman yang sedang aktif
  const currentPageLink = pagination.querySelector(`[data-page="${page}"]`);
  if (currentPageLink) {
    currentPageLink.classList.add("active");
  }

  // Nonaktifkan tombol 'Previous' jika di halaman pertama
  prevPage.disabled = page === 1;

  // Nonaktifkan tombol 'Next' jika di halaman terakhir
  nextPage.disabled = page === Math.ceil(posts.length / postsPerPage);
}

// Tambahkan event listener untuk tombol halaman
pagination.addEventListener("click", (event) => {
  if (event.target.classList.contains("page-link")) {
    const page = parseInt(event.target.getAttribute("data-page"));
    loadPosts(page);
    updatePaginationButtons(page);
  }
});

// Tambahkan event listener untuk tombol 'Previous'
prevPage.addEventListener("click", () => {
  const currentPage = parseInt(
    pagination.querySelector(".active").getAttribute("data-page")
  );
  const prevPage = currentPage - 1;
  if (prevPage >= 1) {
    loadPosts(prevPage);
    updatePaginationButtons(prevPage);
  }
});

// Tambahkan event listener untuk tombol 'Next'
nextPage.addEventListener("click", () => {
  const currentPage = parseInt(
    pagination.querySelector(".active").getAttribute("data-page")
  );
  const nextPage = currentPage + 1;
  if (nextPage <= Math.ceil(posts.length / postsPerPage)) {
    loadPosts(nextPage);
    updatePaginationButtons(nextPage);
  }
});

// Mulai dengan menampilkan halaman pertama saat halaman dimuat
loadPosts(1);
updatePaginationButtons(1);
