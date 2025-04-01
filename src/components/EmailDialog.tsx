
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendResultsByEmail } from "../utils/exportService";
import { EOQInputs, EOQResults } from "../utils/eoqCalculator";
import { Email } from "lucide-react";

interface EmailDialogProps {
  inputs: EOQInputs;
  results: EOQResults;
}

const EmailDialog: React.FC<EmailDialogProps> = ({ inputs, results }) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const handleSendEmail = async () => {
    if (!email) return;
    
    setIsSending(true);
    try {
      await sendResultsByEmail(email, inputs, results);
      setIsOpen(false);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white text-eco-text border-eco-secondary/50 hover:bg-eco-secondary/10"
        >
          <Email className="h-4 w-4" />
          Email Results
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email EOQ Results</DialogTitle>
          <DialogDescription>
            Send the EOQ calculation results to your email address.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="eco-input"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSendEmail}
            disabled={!email || isSending}
            className="bg-eco-primary hover:bg-eco-primary/90 text-white"
          >
            {isSending ? "Sending..." : "Send Results"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
