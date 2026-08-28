import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorSettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your vendor account and preferences.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vendor Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Settings content coming soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}
