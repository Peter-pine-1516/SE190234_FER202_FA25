const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "public"),
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

const ensureImagesDir = () => {
  const imagesDir = path.join(__dirname, "public", "images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  return imagesDir;
};

const slugify = (value) =>
  value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);

server.post("/upload-image", (req, res) => {
  try {
    const { dataUrl, fileName, title } = req.body || {};

    if (!dataUrl || !fileName) {
      return res.status(400).json({ message: "Thiếu dataUrl hoặc fileName" });
    }

    const matches = dataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ message: "Định dạng ảnh không hợp lệ" });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const extensionFromMime = mimeType.split("/")[1] || "jpg";
    const originalExt = path.extname(fileName);
    const extension = originalExt || `.${extensionFromMime}`;

    const baseFileName =
      slugify(title || path.parse(fileName).name || "movie") || "movie";
    const uniqueSuffix = `${Date.now()}-${crypto
      .randomBytes(6)
      .toString("hex")}`;
    const safeFileName = `${baseFileName}-${uniqueSuffix}${extension}`;

    const imagesDir = ensureImagesDir();
    const filePath = path.join(imagesDir, safeFileName);

    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFile(filePath, buffer, (error) => {
      if (error) {
        console.error("Không thể lưu ảnh:", error);
        return res.status(500).json({ message: "Không thể lưu ảnh" });
      }

      return res.status(201).json({ path: `/images/${safeFileName}` });
    });
  } catch (error) {
    console.error("Lỗi upload ảnh:", error);
    return res
      .status(500)
      .json({ message: "Lỗi máy chủ khi lưu ảnh", detail: error.message });
  }
});

server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server đang chạy tại http://localhost:${PORT}`);
});

