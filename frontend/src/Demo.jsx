import { useQuery } from "@tanstack/react-query";

export default function Demo() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  console.log(data);
  async function fetchUsers() {
    const data = await fetch(`https://dummyjson.com/users`);
    return data;
  }

  return <h1>Thi is demo</h1>;
}
