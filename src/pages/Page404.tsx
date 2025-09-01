import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardContent className="text-center py-16">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100">
            404
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Oops! The page you’re looking for doesn’t exist.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={() => navigate(-1)} variant="outline">
              Go Back
            </Button>
            <Button onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page404
