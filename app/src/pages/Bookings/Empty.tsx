import Card from "~/components/Card"

const EmptyBookings = () => {
  return (
    <Card className="p-16 text-center border-dashed border-2 max-w-md mx-auto">
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-3">
          No bookings yet
        </h3>
        <p className="text-muted-foreground mb-6">
          Create your first booking to get started
        </p>
      </div>
    </Card>
  )
}

export default EmptyBookings

