import { Inter } from "next/font/google";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = new useRouter();

  // Function to handle next button click
  const handleNextClicked = () => {
    // Retrieve input values
    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const areaZone = document.getElementById('areaZone').value;
    const category = document.getElementById('category').value;

    try {
      localStorage.setItem('bible_fullName', fullName);
      localStorage.setItem('bible_dob', dob);
      localStorage.setItem('bible_areaZone', areaZone);
      localStorage.setItem('bible_category', category);
      router.push('/instructions');
    } catch {
      console.error("Failed to store data");
    }

    // Proceed with next action (if any)
    console.log("next clicked");
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center pt-24${inter.className}`} style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="flex flex-col gap-6 items-center justify-center px-4 sm:px-8 md:px-20 w-full max-w-screen-lg">
        <h1 className="text-2xl font-semibold text-teal-600 text-center">Welcome to the Bible Quiz!</h1>
        <Card className="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 justify-center items-center gap-6 border-none text-center bg-white rounded-lg shadow-xl">
          <div className={`w-full h-32 rounded-t-lg ${inter.className}`} style={{ backgroundImage: 'url(/images/repeating-chevrons.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
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
            <Button onClick={handleNextClicked} className="next-button bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8">NEXT</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
