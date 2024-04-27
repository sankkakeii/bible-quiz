import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({});

    useEffect (() => {
        localStorage.setItem('bible_quiz_login', loginData);
    })

    const handleLoginClicked = async () => {
        setLoading(true); // Set loading state to true
        setError(null); // Clear any previous errors

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const data = {
            email: username, // Assuming email is used for login based on the provided endpoint payload
            password
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const responseData = await response.json();
            setLoginData(JSON.stringify(responseData));

            // console.log('RESPONSE DATA:::::::::::', responseData)

            // Assuming the token is returned in responseData.data.token
            const token = responseData.data.data.token;
            if (token) {
                localStorage.setItem('token', token);
                router.push('/instructions');
            } else {
                throw new Error('Token not found in response');
            }
        } catch (error) {
            console.error(error.message);
            setError('Failed to login');
        } finally {
            setLoading(false); // Set loading state to false regardless of success or failure
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center pt-24" style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col gap-6 items-center justify-center px-4 sm:px-8 md:px-20 w-full max-w-screen-lg">
                <h1 className="text-2xl font-semibold text-teal-600 text-center">Login to Your Account</h1>
                <Card className="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 justify-center items-center gap-6 border-none text-center bg-white rounded-lg shadow-xl">
                    <div className="w-full h-32 rounded-t-lg" style={{ backgroundImage: 'url(/images/repeating-chevrons.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                    <div className="p-4 md:p-8 w-full flex flex-col gap-3">
                        <div className="text-left">
                            <label>Username</label>
                            <Input id="username" placeholder="Username" className="w-full" />
                        </div>
                        <div className="text-left">
                            <label>Password</label>
                            <Input id="password" placeholder="Password" type="password" className="w-full" />
                        </div>
                        <Button onClick={handleLoginClicked} className={`login-button bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="flex items-center w-full justify-center">
                                {loading ? 'LOADING' : 'LOGIN'}
                            </div>
                        </Button>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </Card>
            </div>
        </main>
    );
}
