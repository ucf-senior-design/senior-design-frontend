import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Grid } from "@mui/material"
import Typography from "@mui/material/Typography"
import Avatar from "../../components/Avatar"
import { useTrip } from "../../utility/hooks/trip"
import { Trip } from "../../utility/types/trip"

export default function TripHeader({ trip_details }: { trip_details: Trip }) {
  const { trip } = useTrip()
  const item1 = { username: "username", id: "123", name: "noriyuki" }
  const item2 = { username: "username2", id: "456", name: "minoru" }
  const example = [item1, item2]

  return (
    <div>
      <Grid
        container
        style={{
          padding: "20px",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "start",
            gap: 1,
            paddingTop: "50px",
          }}
        >
          <ArrowBackIcon sx={{ color: "white", fontSize: 40 }} />
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "left",
            justifyContent: "start",
            paddingLeft: "50px",
          }}
        >
          <Typography sx={{ color: "white", fontWeight: "700", fontSize: "40px" }}>
            {/* {trip_details.destination} <EditIcon sx={{ color: "white" }} /> */}
          </Typography>

          <Typography sx={{ color: "white", fontWeight: "400", fontSize: "20px" }}>
            {/* {{trip_details.duration.start}.toLocaleDateString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric'
            })} */}
            trip
          </Typography>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            {example.map((item) => (
              <Avatar key={item.id} name={item.username} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
