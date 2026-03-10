import { useQuery } from "@tanstack/react-query";

export function APITester() {
  const { data, isSuccess } = useQuery({
    queryKey: ["analyze"],
    queryFn: async () => {
      const res = await fetch("/api/analyze");
      return res.json();
    },
  });

  return (
    <div className="mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4">
      {isSuccess && data.result}
    </div>
  );
}
