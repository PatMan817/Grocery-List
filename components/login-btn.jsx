import { useSession, signIn, signOut } from "next-auth/react"
export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div style={{position: 'absolute', left: '0px', backgroundColor: 'white', padding: '2px', borderRadius: '2%'}}>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <>
      Not signed in <br /><br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}