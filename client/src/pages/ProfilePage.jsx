import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

const ProfilePage = () => {

    const [profile, setProfile] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                const response = await axios.get('http://localhost:3000/profile', {
                    headers: {
                        'Authorization': token
                    }
                });
                setProfile(response.data);
                setProfile(response.data);
                setName(response.data.name);
                setNickname(response.data.nickname);
                
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);


    const handleEditprofile = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put('http://localhost:3000/updateProfile', {
                name,
                nickname
            }, {
                headers: {
                    'Authorization': token
                }
            });
            console.log('Profile updated:', response.data);
            setProfile(response.data);
            setShowModal(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
      }

    return (
        <div>
            <div>
                <h1>Profile</h1>
                <p>name: {profile.name}</p>
                <p>nickname: {profile.nickname}</p>

                <button onClick={() => setShowModal(true)}>Edit Profile</button>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h2>Edit Profile</h2>
                <form onSubmit={handleEditprofile}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name}  onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Nickname:</label>
                        <input type="text" value={nickname} onChange={(e) =>setNickname(e.target.value)}/>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </Modal>
        </div>

        
    );
};

export default ProfilePage;