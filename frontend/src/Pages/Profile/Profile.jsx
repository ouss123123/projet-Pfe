import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UserNav from "../../Components/Navbar/userNav";
import axiosInstance from "../../axios/axiosInstance";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Profile = () => {
    const { t } = useTranslation();
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        profilePic: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [previewPic, setPreviewPic] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [data, setData] = useState(null);
    
    const userId = sessionStorage.getItem("userId") || null;
    

    useEffect(() => {
        const name = sessionStorage.getItem("name") || "";
        const email = sessionStorage.getItem("email") || "";
        const phone = sessionStorage.getItem("phone") || "";
        const profilePicture = sessionStorage.getItem("profile_picture") || "";
        let profilePicUrl = "";
        if (profilePicture) {
            if (profilePicture.includes("uploads")) {
                profilePicUrl = `http://localhost:5000/uploads/usersImages/${profilePicture.slice(8)}`;
            } else {
                profilePicUrl = `http://localhost:5000/${profilePicture.slice(9)}`;
            }
        }
        setFormData({ name, email, phone, profilePic: profilePicUrl });
        setPreviewPic(profilePicUrl);
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        try {
            axiosInstance
                .patch(
                    `/users/${userId}`,
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        avatar: base64Image,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(() => {
                    sessionStorage.removeItem("profile_picture");
                    window.location.reload();
                    getUserData();
                });
        } catch (error) {
            console.error(error);
        }
        setIsEditing(false);
    };

    const handleProfilePicChange = (e) => {
        let a = e.target.files[0],
            p = new FileReader();
        p.readAsDataURL(a),
            (p.onloadend = () => {
                setBase64Image(p.result);
                setNewProfilePic(a);
                setPreviewPic(p.result);
            });
    };

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get(`/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setData(response.data);
            sessionStorage.setItem("profile_picture", response.data.data.profile_picture);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <UserNav />
            <div className="container mx-auto px-4 py-8 mt-20">
                <div className="max-w-4xl mx-auto">
                    <Card className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Profile Picture Section */}
                            <div className="flex flex-col items-center md:w-1/3">
                                <div className="relative group">
                                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                        <img
                                            src={previewPic || formData.profilePic || "/images/default.webp"}
                                            alt={t("profile.profilePicAlt", "Profile Picture")}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {isEditing && (
                                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <span className="text-white text-sm font-medium">
                                                {t("profile.editPicButton", "Change Photo")}
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleProfilePicChange}
                                            />
                                        </label>
                                    )}
                                </div>
                                <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {formData.name}
                                </h2>
                                <p className="text-gray-600">{formData.email}</p>
                            </div>

                            {/* Profile Information Section */}
                            <div className="md:w-2/3">
                                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                                    {t("profile.personalInfo", "Personal Information")}
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t("profile.name", "Name")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            />
                                        ) : (
                                            <div className="text-lg text-gray-800">{formData.name}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t("profile.email", "Email")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            />
                                        ) : (
                                            <div className="text-lg text-gray-800">{formData.email}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t("profile.phone", "Phone")}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            />
                                        ) : (
                                            <div className="text-lg text-gray-800">{formData.phone}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-4">
                                    {isEditing ? (
                                        <>
                                            <Button
                                                onClick={handleSaveProfile}
                                                className="flex-1"
                                            >
                                                {t("profile.saveProfileButton", "Save Changes")}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsEditing(false)}
                                                className="flex-1"
                                            >
                                                {t("profile.cancelButton", "Cancel")}
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={handleEditProfile}
                                            className="w-full"
                                        >
                                            {t("profile.editProfileButton", "Edit Profile")}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
