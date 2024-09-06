import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import UpdateProfileForm from '../Components/Profile/UpdateProfileForm';

type Props = {}

const ProfilePage = (props: Props) => {
    const user = useSelector((state:RootState)=>state.user);
    const isAuthenticated = !!user.token;
  return (
    <div>ProfilePage
        <p>Your username: {user.username}</p>
        <p>Your email: {user.email}</p>
       <UpdateProfileForm/>
    </div>
  )
}

export default ProfilePage