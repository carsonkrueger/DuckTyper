async function getRecords() {
  const res = await fetch(`${process.env.BASE_URL}/api/getRecords`);
  if (!res.ok) {
    console.log("ERROR BITCH");
  }
  console.log(res.body);
  return res.body;
}

export default async function LeaderBoard() {
  const data = await getRecords();
  console.log(data);
  return (
    <div className="min-h-screen bg-dark p-[10vh]">
      <div className="flex flex-col mx-auto bg-secondary rounded-lg max-w-lg w-[16rem] md:w-[26rem] lg:w-[32rem] h-[48rem] max-h-[90vh]"></div>
    </div>
  );
}
