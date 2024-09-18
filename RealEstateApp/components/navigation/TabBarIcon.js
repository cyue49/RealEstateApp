import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabBarIcon({ name, color }) {
    return (
        <FontAwesome
            name={name}
            size={24}
            color={color}
        />
    )
}