const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12",
  },
};

const {
  address: { street, city = "Unknown city" },
} = person;
console.log(street); // "Lalaland 12"
console.log(city); // "Unknown city"

//Destructuring (phân rã) là cú pháp trong JavaScript giúp bạn lấy giá trị từ mảng
//hoặc thuộc tính từ đối tượng và gán vào các biến riêng biệt một cách ngắn gọn.

//person.address.street là kiểu truy cập trực tiếp vào thuộc tính lồng nhau của đối tượng bằng dấu chấm
//const street = person.address.street;
