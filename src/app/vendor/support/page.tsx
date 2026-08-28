import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorSupportPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground text-sm">Get help with your vendor account and lease operations.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Support</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Support content coming soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}
