import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"
import { useEffect, useState } from "react"
import { useGetProfileById, useUpdateProfile } from "@/hooks/useProfile"
import { getJwtUserId } from "@/utils/getJwtRoleId"
import { useForm } from "react-hook-form"
import { profileFormSchema, type ProfileFormValues } from "./schema/profileFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import useProfileContext from "@/store/profile/profileContext"
import useSwal from "@/hooks/useSwal"

const ProfilePage = () => {
    const zProfileAEData = useProfileContext((state) => state.zProfileAEData);
    const zProfileImage = useProfileContext((state) => state.zProfileImage); // get from zustand
    const zSetProfileImage = useProfileContext((state) => state.zSetProfileImage);
    const zProfileImageStr = useProfileContext((state) => state.zProfileImageStr);
    const zSetProfileImageStr = useProfileContext((state) => state.zSetProfileImageStr);

    const [profileId] = useState(getJwtUserId()); // always from JWT

    const { data: profileById, isLoading } = useGetProfileById({
        id: profileId,
    });
    const { showConfirm, showToast } = useSwal();
    const updateProfile = useUpdateProfile();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            mobileNumber: "",
            position: "",
            address: "",
            dateOfBirth: new Date(),
        },
        mode: "onTouched",
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = form;

    const apiRoot = import.meta.env.VITE_APP_API_ROOT_ENDPOINT;

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            zSetProfileImage(file);
            zSetProfileImageStr("");
        }
    };

    const onSubmit = async (values: ProfileFormValues) => {
        console.log("values: ", values)
        try {
            await updateProfile.mutateAsync({
                Id: profileId,
                Firstname: values.firstname,
                Lastname: values.lastname,
                Address: values.address,
                MobileNumber: values.mobileNumber,
                DateOfBirth: values.dateOfBirth,
                Position: values.position,
            }); showToast("Profile updated!", "success")
        } catch (err: any) { console.error("Update failed:", err); showToast("Failed to update profile", "error") }
    };

    // Sync Zustand profile data with form
    useEffect(() => {
        reset(zProfileAEData);
    }, [zProfileAEData, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto space-y-6 p-6 bg-white shadow-md rounded-xl"
        >
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-4">
                <label className="relative cursor-pointer">
                    {zProfileImageStr ? (
                        <img
                            src={apiRoot + zProfileImageStr}
                            alt="Profile"
                            className="w-[250px] h-[250px] rounded-full object-cover border-4 border-gray-200"
                        />
                    ) : zProfileImage ? (
                        <img
                            src={URL.createObjectURL(zProfileImage)}
                            alt="Profile"
                            className="w-[250px] h-[250px] rounded-full object-cover border-4 border-gray-200"
                        />
                    ) : (
                        <div className="w-[250px] h-[250px] rounded-full bg-gray-100 flex items-center justify-center border-4 border-dashed border-gray-300">
                            <Camera className="w-12 h-12 text-gray-400" />
                        </div>
                    )}

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
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <Label htmlFor="firstname">Firstname</Label>
                        <Input id="firstname" {...register("firstname")} placeholder="John" />
                        {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="lastname">Lastname</Label>
                        <Input id="lastname" {...register("lastname")} placeholder="Doe" />
                        {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
                    </div>
                </div>

                <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...register("address")} placeholder="123 Main St" />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>

                <div>
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input id="mobileNumber" {...register("mobileNumber")} placeholder="+63 912 345 6789" />
                    {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber.message}</p>}
                </div>

                <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                    {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
                </div>

                <div>
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" {...register("position")} placeholder="Software Engineer" />
                    {errors.position && <p className="text-red-500">{errors.position.message}</p>}
                </div>
            </div>

            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
        </form>
    );
};

export default ProfilePage;

