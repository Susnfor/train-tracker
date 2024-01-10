import ServicesStatus from "./components/ServicesStatus";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {/*Plan
    TFL/ Train-Bus Tracker
    import the api 
    display the services / if down/  what problem

    put in location/ train stop (drop down?)
    try and find if there is a stop that includes that name
    if multiple stops with that name, display all stops with that name
    display trains at that stop and time
    display if there are any delays
    display bus stops near that location???
    go back to home page to search again
    */}
    <ServicesStatus />
    </main>
  )
}
