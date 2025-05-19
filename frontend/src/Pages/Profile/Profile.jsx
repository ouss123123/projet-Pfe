import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UserNav from "../../Components/Navbar/userNav";
import axiosInstance from "../../axios/axiosInstance";

const Profile = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
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
    const [data,setData]= useState(null);
    
    const userId = sessionStorage.getItem("userId") || null;
    // Redirect if not authenticated
    const token = sessionStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }
    useEffect(() => {
        // Get user data from sessionStorage
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
        setFormData({ name, email,phone, profilePic: profilePicUrl });
        setPreviewPic(profilePicUrl);
        
    }, [navigate]);

    console.log(newProfilePic);
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
        };
        
        setIsEditing(false);
    };
    console.log(formData);
    const handleProfilePicChange = (e) => {
      let a = e.target.files[0],
        p = new FileReader();
      p.readAsDataURL(a),
        (p.onloadend = () => {
          setBase64Image(p.result),
            setNewProfilePic(a);
          setPreviewPic(p.result);
        });
    };
    const getUserData = async () => {
        try {
            const response = await axiosInstance.get(`/users/${userId}` , {
                headers: {  Authorization: `Bearer ${token}` },
              }); 
              setData(response.data);
              sessionStorage.setItem("profile_picture", response.data.data.profile_picture);
        } catch (error) {
            console.error(error);
        };
    };
    useEffect(() => {
        getUserData();
    }, []);
console.log(base64Image);
    return (
        <div className="min-h-screen bg-gray-50">
            <UserNav />
            <div className="flex flex-col items-center justify-center pt-32 pb-10">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
                    <div className="relative mb-4">
                        <img
                            src={previewPic || formData.profilePic || "/images/default.webp"}
                            alt={t("profile.profilePicAlt", "Profile Picture")}
                            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
                        />
                        {isEditing && (
                            <label className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-600 cursor-pointer">
                                {t("profile.editPicButton", "Edit Picture")}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfilePicChange}
                                />
                            </label>
                        )}
                    </div>
                    <form className="w-full flex flex-col items-center">
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {t("profile.name", "Name")}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            ) : (
                                <div className="text-lg font-semibold text-gray-800">{formData.name}</div>
                            )}
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {t("profile.email", "Email")}
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            ) : (
                                <div className="text-lg text-gray-700">{formData.email}</div>
                            )}
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {t("profile.phone", "Phone")}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            ) : (
                                <div className="text-lg text-gray-700">{formData.phone}</div>
                            )}
                        </div>
                        <div className="flex gap-4 mt-6">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                                        onClick={handleSaveProfile}
                                    >
                                        {t("profile.saveProfileButton", "Save Profile")}
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        {t("profile.cancelButton", "Cancel")}
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                                    onClick={handleEditProfile}
                                >
                                    {t("profile.editProfileButton", "Edit Profile")}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
