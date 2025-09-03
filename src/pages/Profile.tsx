import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"
import { useState } from "react"

const Profile = () => {
    const [image, setImage] = useState<string | null>(null)

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log({
            name: formData.get("name"),
            address: formData.get("address"),
            mobile: formData.get("mobile"),
            dob: formData.get("dob"),
            position: formData.get("position"),
            image,
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto space-y-6 p-6 bg-white shadow-md rounded-xl"
        >
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-4">
                <label className="relative cursor-pointer">
                    {image ? (
                        <img
                            src={image}
                            alt="Profile"
                            className="w-[250px] h-[250px] rounded-full object-cover border-4 border-gray-200"
                        />
                    ) : (
                        <div className="w-[250px] h-[250px] rounded-full bg-gray-100 flex items-center justify-center border-4 border-dashed border-gray-300">
                            <Camera className="w-12 h-12 text-gray-400" />
                        </div>
                    )}

                    {/* Hidden File Input */}
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </label>
                <p className="text-sm text-gray-500">Click the circle to upload an image</p>
            </div>

            {/* Profile Info Fields */}
            <div className="space-y-3">
                <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                </div>

                <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" placeholder="123 Main St" required />
                </div>

                <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" name="mobile" placeholder="+63 912 345 6789" required />
                </div>

                <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" name="dob" type="date" required />
                </div>

                <div>
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" name="position" placeholder="Software Engineer" required />
                </div>
            </div>

            <Button type="submit" className="w-full">
                Save Profile
            </Button>
        </form>
    )
}

export default Profile
