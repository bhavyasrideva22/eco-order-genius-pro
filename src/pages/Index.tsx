
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  EOQInputs, 
  EOQResults, 
  calculateEOQ, 
  formatIndianRupees,
  generateEOQCostData
} from "../utils/eoqCalculator";
import { generatePDF } from "../utils/exportService";
import { Download, PieChart } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EOQChart from "../components/EOQChart";
import EOQDiagram from "../components/EOQDiagram";
import EmailDialog from "../components/EmailDialog";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [inputs, setInputs] = useState<EOQInputs>({
    annualDemand: 1000,
    orderCost: 200,
    holdingCost: 20,
    unitCost: 100,
  });

  const [results, setResults] = useState<EOQResults | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleCalculate = () => {
    if (inputs.annualDemand <= 0 || inputs.orderCost <= 0 || inputs.holdingCost <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Inputs",
        description: "All values must be greater than zero.",
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const calculatedResults = calculateEOQ(inputs);
      setResults(calculatedResults);
      
      const costData = generateEOQCostData(inputs);
      setChartData(costData);
      
      setIsCalculating(false);
    }, 500);
  };

  const handleDownloadPDF = async () => {
    if (!results) return;
    
    try {
      const pdfBlob = await generatePDF(inputs, results);
      const url = URL.createObjectURL(pdfBlob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'eoq-results.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "PDF Downloaded",
        description: "Your EOQ results have been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Could not generate the PDF. Please try again.",
      });
    }
  };

  // Calculate on initial load
  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-eco-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-eco-primary">
            Economic Order Quantity (EOQ) Calculator
          </h1>
          <p className="text-eco-text/80 mb-8">
            Optimize your inventory management by finding the perfect balance between ordering costs and holding costs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Input Card */}
            <Card className="md:col-span-1 border-eco-secondary/20 shadow-sm">
              <CardHeader className="bg-eco-primary/5 border-b border-eco-secondary/20">
                <CardTitle className="text-eco-primary text-xl">Input Parameters</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
                  <div className="eco-input-group">
                    <Label htmlFor="annualDemand" className="eco-label">
                      Annual Demand (units)
                    </Label>
                    <Input
                      id="annualDemand"
                      name="annualDemand"
                      type="number"
                      value={inputs.annualDemand}
                      onChange={handleInputChange}
                      min="1"
                      step="1"
                      className="eco-input"
                    />
                  </div>
                  
                  <div className="eco-input-group">
                    <Label htmlFor="orderCost" className="eco-label">
                      Ordering Cost (₹ per order)
                    </Label>
                    <Input
                      id="orderCost"
                      name="orderCost"
                      type="number"
                      value={inputs.orderCost}
                      onChange={handleInputChange}
                      min="0.01"
                      step="0.01"
                      className="eco-input"
                    />
                  </div>
                  
                  <div className="eco-input-group">
                    <Label htmlFor="holdingCost" className="eco-label">
                      Holding Cost (₹ per unit per year)
                    </Label>
                    <Input
                      id="holdingCost"
                      name="holdingCost"
                      type="number"
                      value={inputs.holdingCost}
                      onChange={handleInputChange}
                      min="0.01"
                      step="0.01"
                      className="eco-input"
                    />
                  </div>
                  
                  <div className="eco-input-group">
                    <Label htmlFor="unitCost" className="eco-label">
                      Unit Cost (₹) (Optional)
                    </Label>
                    <Input
                      id="unitCost"
                      name="unitCost"
                      type="number"
                      value={inputs.unitCost}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="eco-input"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-eco-accent hover:bg-eco-accent/90 text-eco-text font-semibold"
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Calculating..." : "Calculate EOQ"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Results Card */}
            <Card className="md:col-span-2 border-eco-secondary/20 shadow-sm">
              <CardHeader className="bg-eco-primary/5 border-b border-eco-secondary/20 flex flex-row items-center justify-between">
                <CardTitle className="text-eco-primary text-xl">EOQ Results</CardTitle>
                {results && (
                  <div className="flex items-center gap-2">
                    <EmailDialog inputs={inputs} results={results} />
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 bg-white text-eco-text border-eco-secondary/50 hover:bg-eco-secondary/10"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                {results ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="eco-card bg-eco-primary/5 flex flex-col items-center justify-center p-6 space-y-2">
                        <span className="text-sm text-eco-text/70">Economic Order Quantity</span>
                        <span className="text-3xl font-bold text-eco-primary">{results.eoq} units</span>
                      </div>
                      <div className="eco-card bg-eco-primary/5 flex flex-col items-center justify-center p-6 space-y-2">
                        <span className="text-sm text-eco-text/70">Total Annual Cost</span>
                        <span className="text-3xl font-bold text-eco-primary">{formatIndianRupees(results.totalAnnualCost)}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="eco-card flex flex-col items-center p-4">
                        <span className="text-sm text-eco-text/70">Order Cycles / Year</span>
                        <span className="text-xl font-semibold text-eco-primary">{results.orderCyclesPerYear}</span>
                      </div>
                      <div className="eco-card flex flex-col items-center p-4">
                        <span className="text-sm text-eco-text/70">Days Between Orders</span>
                        <span className="text-xl font-semibold text-eco-primary">{results.daysBetweenOrders}</span>
                      </div>
                      <div className="eco-card flex flex-col items-center p-4">
                        <span className="text-sm text-eco-text/70">Annual Holding Cost</span>
                        <span className="text-xl font-semibold text-eco-primary">{formatIndianRupees(results.annualHoldingCost)}</span>
                      </div>
                      <div className="eco-card flex flex-col items-center p-4">
                        <span className="text-sm text-eco-text/70">Annual Ordering Cost</span>
                        <span className="text-xl font-semibold text-eco-primary">{formatIndianRupees(results.annualOrderCost)}</span>
                      </div>
                    </div>
                    
                    {chartData.length > 0 && (
                      <>
                        <EOQChart data={chartData} eoq={results.eoq} />
                        <EOQDiagram eoq={results.eoq} daysBetweenOrders={results.daysBetweenOrders} />
                      </>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center p-12">
                    <div className="text-center animate-pulse-gentle">
                      <PieChart className="h-12 w-12 text-eco-secondary mb-4 mx-auto" />
                      <p className="text-eco-text/70">Enter your inventory parameters and click Calculate</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* About EOQ Section */}
          <section className="mt-12 eco-card">
            <h2 className="text-2xl font-bold text-eco-primary mb-4">What is Economic Order Quantity (EOQ)?</h2>
            <div className="prose prose-green max-w-none">
              <p className="mb-4">
                The Economic Order Quantity (EOQ) model is a fundamental inventory management technique that helps businesses 
                determine the optimal order quantity that minimizes total inventory costs, including both ordering costs and 
                holding costs.
              </p>
              
              <h3 className="text-xl font-semibold text-eco-primary mt-6 mb-3">How EOQ Benefits Your Business</h3>
              <p className="mb-4">
                By calculating and implementing the optimal EOQ, businesses can achieve significant cost savings and 
                operational improvements:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Reduced inventory costs:</strong> Balancing ordering and holding costs to minimize total expenses.
                </li>
                <li>
                  <strong>Improved cash flow:</strong> Less capital tied up in excess inventory means improved liquidity.
                </li>
                <li>
                  <strong>Enhanced operational efficiency:</strong> Streamlined ordering processes and warehouse operations.
                </li>
                <li>
                  <strong>Better decision-making:</strong> Data-driven inventory management instead of guesswork.
                </li>
                <li>
                  <strong>Reduced stockouts and overstock situations:</strong> More consistent inventory levels.
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold text-eco-primary mt-6 mb-3">Understanding the EOQ Formula</h3>
              <p className="mb-2">
                The EOQ formula calculates the optimal order quantity by finding the point where the total cost of ordering 
                and holding inventory is at its minimum:
              </p>
              
              <div className="bg-eco-primary/10 p-4 rounded-lg text-center mb-4">
                <p className="font-semibold">EOQ = √(2DS/H)</p>
                <p className="text-sm mt-2">
                  Where:<br />
                  D = Annual demand quantity<br />
                  S = Fixed cost per order<br />
                  H = Annual holding cost per unit
                </p>
              </div>
              
              <h3 className="text-xl font-semibold text-eco-primary mt-6 mb-3">When to Use EOQ Calculator</h3>
              <p className="mb-4">
                The EOQ calculator is particularly valuable in these scenarios:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>When you need to optimize procurement processes and reduce costs</li>
                <li>During supply chain optimization initiatives</li>
                <li>When reviewing inventory management policies</li>
                <li>As part of annual budgeting and financial planning</li>
                <li>When experiencing either frequent stockouts or excessive inventory carrying costs</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-eco-primary mt-6 mb-3">EOQ Assumptions and Limitations</h3>
              <p className="mb-2">
                While highly valuable, the basic EOQ model makes several assumptions:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Constant and known demand rate</li>
                <li>Fixed ordering and holding costs</li>
                <li>Instant order fulfillment (no lead time)</li>
                <li>No quantity discounts</li>
                <li>Orders arrive complete (not in partial shipments)</li>
              </ul>
              
              <p>
                For more complex scenarios with variable demand, lead times, or quantity discounts, advanced inventory 
                models may be more appropriate. Our consultants can help you determine the best approach for your 
                specific business needs.
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
