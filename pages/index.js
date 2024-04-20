import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [category, setCategory] = useState(null);

  const handleNextClicked = async () => {
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors
    setSuccess(null);

    const name = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const zone = document.getElementById('areaZone').value;
    const category = document.getElementById('category').value;

    const data = {
      name,
      dob,
      zone,
      category
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      if(response.status === 200) {
        let dataResponse = await response.json();
        console.log(dataResponse)
        setToken(dataResponse.data.data.token);
        setCategory(dataResponse.data.data.user.category);
        setSuccess(dataResponse.data.message);
        router.push('/instructions');
      }
    } catch (error) {
      console.error(error.message);
      setError('Failed to register');
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };


  useEffect (() => {
    if(token && category) {
      localStorage.setItem('token', token);
      localStorage.setItem('category', category);
    }
  }, [token, category]);

  console.log(token);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-24" style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="flex flex-col gap-6 items-center justify-center px-4 sm:px-8 md:px-20 w-full max-w-screen-lg">
        <h1 className="text-2xl font-semibold text-teal-600 text-center">Welcome to the Bible Quiz!</h1>
        <Card className="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 justify-center items-center gap-6 border-none text-center bg-white rounded-lg shadow-xl">
          <div className="w-full h-32 rounded-t-lg" style={{ backgroundImage: 'url(/images/repeating-chevrons.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
          <div className="p-4 md:p-8 w-full flex flex-col gap-3">
            <div className="text-left">
              <label>Full Name</label>
              <Input id="fullName" placeholder="Full Name" className="w-full" />
            </div>
            <div className="text-left">
              <label>Date Of Birth</label>
              <Input id="dob" placeholder="Date Of Birth" type="date" className="w-full" />
            </div>
            <div className="text-left">
              <label>Area/Zone</label>
              <Input id="areaZone" placeholder="Area/Zone" className="w-full" />
            </div>
            <div className="text-left">
              <label>Category</label>
              <select id="category" className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow">
                <option value="9-12">9-12</option>
                <option value="teens">Teens</option>
              </select>
            </div>
            <Button onClick={handleNextClicked} className={`next-button bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex items-center justify-center w-full">
                  {loading ? <Spinner /> : 'NEXT'}
                </div>
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </div>
        </Card>
      </div>
    </main>
  );
}
