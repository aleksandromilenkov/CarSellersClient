import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import UpdateProfileForm from '../Components/Profile/UpdateProfileForm';
import { JwtPayloadInterface } from '../Utils/Helpers/Types';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: #f9f9f9; /* Light background for contrast */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProfileInfo = styled.div`
  flex: 1;
  margin-right: 20px;
  text-align: left; /* Align text to the left */
`;

const ProfileImage = styled.img`
  width: 150px; /* Fixed width for the profile image */
  height: auto; /* Maintain aspect ratio */
  border-radius: 50%; /* Circular image */
  margin-bottom: 10px; /* Space below the image */
`;

const UpdateFormContainer = styled.div`
  flex: 1;
  max-width: 400px; /* Limit width of the form */
  padding: 20px;
  background-color: #fff; /* White background for the form */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
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
    <ProfileContainer>
      <ProfileInfo>
        <ProfileImage src={user.profileImage ? `https://localhost:7209/resources/${user.profileImage}` : `https://localhost:7209/resources/${isAdmin ? "emptyAdmin.png" : "emptyUser.png"}`} alt="profileImage" />
        <p>Your username: {user.username}</p>
        <p>Your email: {user.email}</p>
      </ProfileInfo>
      <UpdateFormContainer>
        <UpdateProfileForm />
      </UpdateFormContainer>
    </ProfileContainer>
  )
}

export default ProfilePage