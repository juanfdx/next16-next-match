import Image from 'next/image'
// utils
import { calculateAge } from '@/utils/helpers'
import { Member } from '@/utils/types'

type Props = {
  user: Member
}


export const ProfileCard = ({ user }: Props) => {

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        {/* Avatar */}
        <Image
          src={user.image || "/default-avatar.png"}
          alt={user.name || user.username || "User Avatar"}
          width={100}
          height={100}
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          priority
        />

        {/* Basic info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">{user.name || "No name"}</h1>
          {user.username && (
            <p className="text-gray-500 text-sm">@{user.username}</p>
          )}

          <p className="mt-2 text-gray-600">
            {user.gender && <span>{user.gender}</span>} 
            {(calculateAge(user.dateOfBirth) > 0) && <span>{user.gender ? ` • ${calculateAge(user.dateOfBirth)} years` : `${calculateAge(user.dateOfBirth)} years`}</span>}
          </p>

          <p className="mt-1 text-gray-600">
            {user.city && <span>{user.city}</span>}
            {user.country && <span>{user.city ? `, ${user.country}` : user.country}</span>}
          </p>
        </div>
      </div>

      {/* Description / Bio */}
      {user.description && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">About Me</h2>
          <p className="text-gray-600">{user.description}</p>
        </div>
      )}
    </div>
  )
}