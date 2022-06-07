import { useAuth } from 'contexts/auth'
import { UserProfileContainer } from './styles'

export function UserProfile() {
  const { user } = useAuth()

  return (
    <UserProfileContainer>
      <img src={user?.avatar || '/images/profile.png'} alt="Usuário" />
      <h3>
        Olá, <br />
        <strong>{user?.name}</strong>
      </h3>
    </UserProfileContainer>
  )
}
