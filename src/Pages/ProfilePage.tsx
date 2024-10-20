import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import UpdateProfileForm from '../Components/Profile/UpdateProfileForm';
import { JwtPayloadInterface } from '../Utils/Helpers/Types';
import { jwtDecode } from 'jwt-decode';

type Props = {}

const ProfilePage = (props: Props) => {
    const user = useSelector((state:RootState)=>state.user);
    let isAdmin:boolean = false;
    if(user.token){
      const decodedToken = jwtDecode<JwtPayloadInterface>(user.token.toString());
      const userRoles = decodedToken.role || [];
      isAdmin = userRoles.includes('Admin');
    }
  return (
    <div>ProfilePage
       <img src={user.profileImage ? `https://localhost:7209/resources/${user.profileImage}` : `https://localhost:7209/resources/${isAdmin ? "emptyAdmin.png" : "emptyUser.png"}`  } alt="profileImage" />
        <p>Your username: {user.username}</p>
        <p>Your email: {user.email}</p>
       <UpdateProfileForm/>
    </div>
  )
}

export default ProfilePage