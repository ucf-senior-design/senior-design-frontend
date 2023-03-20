import { Button, Card, Typography } from "@mui/material"
import { useRouter } from "next/router"

export default function TripCard({
  uid,
  destination,
  imageURI,
}: {
  uid: string
  destination: string
  imageURI: string
}) {
  const router = useRouter()
  const tempImage =
    "https://images.unsplash.com/photo-1521706862577-47b053587f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJvcGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  return (
    <Button
      onClick={() => {
        router.push(`/trip/`, {
          query: { id: uid },
          pathname: "dashboard/trip/",
        })
      }}
      sx={{ width: { xs: "100%", md: "350px" }, height: "250px" }}
    >
      <Card
        sx={{
          width: { xs: "100%", md: "350px" },
          height: "250px",
          margin: "10px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          background: `linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)
        ),url(${tempImage}`,
        }}
        style={{
          fontSize: "40px",
          fontWeight: "600",
          color: "white",
          backgroundColor: "red",
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: "500" }}>{destination}</Typography>
      </Card>
    </Button>
  )
}
