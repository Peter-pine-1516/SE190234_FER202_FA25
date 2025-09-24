function Excercise7() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];

  // 1. Sắp xếp theo end tăng dần
  const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

  // 2. Lấy top 3 công ty kết thúc sớm nhất
  const top3 = sortedCompanies.slice(0, 3);

  // 3. Tạo company0New (tăng start +1) mà không đổi gốc
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // 4. Hàm concatAll
  const concatAll = (...arrays) => [].concat(...arrays);
  const concatResult = concatAll([1, 2], [3], [4, 5]);

  return (
    <div>
      <h2>Excercise7</h2>

      <p>Top 3 công ty kết thúc sớm nhất</p>
      <ul>
        {top3.map((c, i) => (
          <li key={i}>
            {c.name} - {c.end}
          </li>
        ))}
      </ul>

      <p>Đối chiếu dữ liệu gốc và đã xử lý</p>
      <p>
        Gốc: {companies[0].name} - start {companies[0].start}, end{" "}
        {companies[0].end}
      </p>
      <p>
        Mới: {company0New.name} - start {company0New.start}, end{" "}
        {company0New.end}
      </p>

      <p>Kết quả concatAll</p>
      <p>{concatResult.join(", ")}</p>
    </div>
  );
}

export default Excercise7;
