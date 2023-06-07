async function getRecords() {
  const res = await fetch(`${process.env.BASE_URL}/api/getRecords`);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default function LeaderBoard() {
  const data = getRecords();
  // console.log(data);
  return (
    <div className="min-h-screen bg-dark p-[10vh]">
      <div className="flex flex-col mx-auto bg-secondary rounded-lg max-w-lg w-[16rem] md:w-[26rem] lg:w-[32rem] h-[48rem] max-h-[90vh]"></div>
    </div>
  );
}
