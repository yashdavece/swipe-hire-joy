import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, Mail, Phone } from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateImage: string;
  role: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'video' | 'phone' | 'in-person';
}

const mockInterviews: Interview[] = [
  {
    id: "1",
    candidateName: "Alex Johnson",
    candidateEmail: "alex.johnson@email.com",
    candidateImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    role: "Frontend Developer",
    scheduledDate: "2024-01-20",
    scheduledTime: "10:00 AM",
    status: "upcoming",
    type: "video"
  },
  {
    id: "2",
    candidateName: "Sarah Chen",
    candidateEmail: "sarah.chen@email.com",
    candidateImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    role: "Frontend Developer",
    scheduledDate: "2024-01-21",
    scheduledTime: "2:00 PM",
    status: "upcoming",
    type: "video"
  },
  {
    id: "3",
    candidateName: "Emily Davis",
    candidateEmail: "emily.davis@email.com",
    candidateImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    role: "Frontend Developer",
    scheduledDate: "2024-01-18",
    scheduledTime: "11:00 AM",
    status: "completed",
    type: "video"
  }
];

export function InterviewsView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-secondary text-secondary-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Scheduled Interviews</h1>
        <p className="text-muted-foreground">
          Manage and track your upcoming candidate interviews
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Interviews</h3>
          <p className="text-2xl font-bold text-primary">{mockInterviews.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Upcoming</h3>
          <p className="text-2xl font-bold text-accent">
            {mockInterviews.filter(i => i.status === 'upcoming').length}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Completed</h3>
          <p className="text-2xl font-bold text-secondary">
            {mockInterviews.filter(i => i.status === 'completed').length}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">This Week</h3>
          <p className="text-2xl font-bold">2</p>
        </Card>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        {mockInterviews.map((interview) => (
          <Card key={interview.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={interview.candidateImage} alt={interview.candidateName} />
                  <AvatarFallback>
                    {interview.candidateName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-semibold text-lg">{interview.candidateName}</h3>
                  <p className="text-muted-foreground">{interview.role}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{interview.scheduledDate}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{interview.scheduledTime}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      {getTypeIcon(interview.type)}
                      <span className="capitalize">{interview.type}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(interview.status)}>
                  {interview.status}
                </Badge>
                
                <div className="flex space-x-2">
                  {interview.status === 'upcoming' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Reminder
                      </Button>
                      <Button size="sm" className="btn-primary">
                        {interview.type === 'video' ? 'Join Call' : 'View Details'}
                      </Button>
                    </>
                  )}
                  {interview.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      View Feedback
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 p-6 bg-muted/30 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex space-x-4">
          <Button className="btn-primary">
            Schedule New Interview
          </Button>
          <Button variant="outline">
            Export Calendar
          </Button>
          <Button variant="outline">
            Send Bulk Reminders
          </Button>
        </div>
      </div>
    </div>
  );
}