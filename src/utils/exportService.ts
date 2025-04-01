
import { EOQInputs, EOQResults, formatIndianRupees } from "./eoqCalculator";
import { jsPDF } from "jspdf";
import { toast } from "../components/ui/use-toast";

export async function generatePDF(
  inputs: EOQInputs, 
  results: EOQResults
): Promise<Blob> {
  const doc = new jsPDF();
  
  // Add logo/header
  doc.setFillColor(36, 94, 79); // #245e4f
  doc.rect(0, 0, 210, 30, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Eco-Order Genius Pro", 105, 15, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("EOQ Calculator Results", 105, 25, { align: "center" });
  
  // Add date
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 20, 40);
  
  // Add inputs section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Input Parameters", 20, 50);
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Annual Demand: ${inputs.annualDemand} units`, 25, 60);
  doc.text(`Ordering Cost: ${formatIndianRupees(inputs.orderCost)} per order`, 25, 68);
  doc.text(`Holding Cost: ${formatIndianRupees(inputs.holdingCost)} per unit per year`, 25, 76);
  if (inputs.unitCost) {
    doc.text(`Unit Cost: ${formatIndianRupees(inputs.unitCost)}`, 25, 84);
  }
  
  // Add results section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Results", 20, 100);
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Economic Order Quantity (EOQ): ${results.eoq} units`, 25, 110);
  doc.text(`Total Annual Cost: ${formatIndianRupees(results.totalAnnualCost)}`, 25, 118);
  doc.text(`Order Cycles Per Year: ${results.orderCyclesPerYear}`, 25, 126);
  doc.text(`Days Between Orders: ${results.daysBetweenOrders}`, 25, 134);
  doc.text(`Annual Holding Cost: ${formatIndianRupees(results.annualHoldingCost)}`, 25, 142);
  doc.text(`Annual Ordering Cost: ${formatIndianRupees(results.annualOrderCost)}`, 25, 150);
  
  // Add explanatory note
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("The Economic Order Quantity (EOQ) is the optimal order quantity that minimizes", 20, 170);
  doc.text("total inventory costs, balancing ordering costs and holding costs.", 20, 178);
  
  // Add footer
  doc.setFillColor(36, 94, 79); // #245e4f
  doc.rect(0, 270, 210, 27, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("© Eco-Order Genius Pro - www.eco-order-genius.com", 105, 280, { align: "center" });
  doc.text("contact@eco-order-genius.com | +91 98765 43210", 105, 287, { align: "center" });
  
  return doc.output('blob');
}

export async function sendResultsByEmail(
  email: string,
  inputs: EOQInputs,
  results: EOQResults
): Promise<boolean> {
  try {
    // In a real app, this would call an API endpoint to send the email
    console.log(`Sending EOQ results to ${email}`, { inputs, results });
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll just return success
    toast({
      title: "Email Sent Successfully",
      description: `Results have been sent to ${email}`,
    });
    
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    
    toast({
      variant: "destructive",
      title: "Failed to send email",
      description: "Please try again later.",
    });
    
    return false;
  }
}
