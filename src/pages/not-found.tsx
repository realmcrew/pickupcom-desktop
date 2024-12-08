import { Link } from '@tanstack/react-router';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-6">페이지를 찾을 수 없습니다</p>
      <Link to="/" className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
