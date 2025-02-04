type Props = {
  title: string;
  description: string;
};

export default function BlockScreen({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h2 className="text-xl text-gray-600">{description}</h2>
    </div>
  );
}
