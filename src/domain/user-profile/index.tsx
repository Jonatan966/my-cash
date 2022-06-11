import { useAuth } from 'contexts/auth'
import { FaUserCircle } from 'react-icons/fa'
import { UserProfileContainer } from './styles'

export function UserProfile() {
  const { user } = useAuth()

  return (
    <UserProfileContainer>
      {user?.avatar ? (
        <img
          src={user?.avatar || '/images/profile.png'}
          alt={`Imagem de perfil do usuário "${user.name}"`}
        />
      ) : (
        <FaUserCircle size={56} className="blank-avatar" />
      )}

      <h3>
        Olá, <br />
        <strong>{user?.name}</strong>
      </h3>
    </UserProfileContainer>
  )
}
