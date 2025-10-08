// Weather Card Component
// TODO: Create a reusable card component to display weather information

interface WeatherCardProps {
  // TODO: Define your props
  title: string;
  value: string | number;
}

export default function WeatherCard({ title, value }: WeatherCardProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      {/* TODO: Add your styling and layout */}
      <p className="text-3xl font-bold text-blue-600">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}
