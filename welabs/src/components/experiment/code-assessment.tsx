import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Check,
  X,
  Clock,
  Code2,
  RefreshCw,
  Play,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
interface CodeAssessmentProps {
  isDarkMode?: boolean;
}

interface TestCase {
  id: string;
  input: any;
  expectedOutput: any;
  output?: any;
  isCorrect?: boolean | null;
  executionTime?: number | null;
}

interface Problem {
  id: string;
  title: string;
  difficulty: "easy" | "intermediate" | "advanced";
  description: string;
  inputFormat: string;
  outputFormat: string;
  defaultCode: string;
  testCases: TestCase[];
  generateRandomTestCase: () => TestCase;
}

// Utility function to generate random arrays
const generateRandomArray = (length: number, max: number): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
};

// Utility function to sort numbers
const sortNumbers = (arr: number[]): number[] => {
  return [...arr].sort((a, b) => a - b);
};

// Problem header component
const AssessmentHeader = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <Card
    className={`border-none ${
      isDarkMode
        ? "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900"
        : "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"
    } text-white overflow-hidden relative`}
  >
    <CardHeader className="relative z-10">
      <CardTitle className="text-xl md:text-3xl font-extrabold">
        Code Assessment
      </CardTitle>
      <p className="max-w-3xl text-sm md:text-lg mt-2 text-white/90">
        Apply your knowledge of sorting algorithms by implementing them in code.
        Complete the challenges to test your understanding of bubble sort and
        its optimizations.
      </p>
    </CardHeader>
    <div className="absolute -right-10 -bottom-12 opacity-10 hidden md:block">
      <Code2 size={200} strokeWidth={1} />
    </div>
  </Card>
);

// Problem description component
const ProblemDescription = ({
  problem,
  isDarkMode,
}: {
  problem: Problem;
  isDarkMode: boolean;
}) => {
  const difficultyColor = useMemo(() => {
    switch (problem.difficulty) {
      case "easy":
        return isDarkMode
          ? "bg-green-900/60 text-green-300"
          : "bg-green-100 text-green-700";
      case "intermediate":
        return isDarkMode
          ? "bg-amber-900/60 text-amber-300"
          : "bg-amber-100 text-amber-700";
      case "advanced":
        return isDarkMode
          ? "bg-red-900/60 text-red-300"
          : "bg-red-100 text-red-700";
      default:
        return isDarkMode
          ? "bg-gray-800 text-gray-300"
          : "bg-gray-100 text-gray-700";
    }
  }, [problem.difficulty, isDarkMode]);

  return (
    <Card
      className={
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }
    >
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle
            className={`text-lg md:text-xl ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {problem.title}
          </CardTitle>
          <Badge className={`${difficultyColor} font-medium`}>
            {problem.difficulty}
          </Badge>
        </div>
        <p
          className={`mt-2 text-sm md:text-base ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {problem.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div>
          <h4
            className={`text-sm font-medium italic ${
              isDarkMode ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Input Format
          </h4>
          <p
            className={`text-xs md:text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {problem.inputFormat}
          </p>
        </div>

        <div>
          <h4
            className={`text-sm font-medium italic ${
              isDarkMode ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Output Format
          </h4>
          <p
            className={`text-xs md:text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {problem.outputFormat}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Test case component
const TestCaseItem = ({
  testCase,
  onRunTest,
  showExpectedOutput,
  toggleExpectedOutput,
  isDarkMode,
  index,
}: {
  testCase: TestCase;
  onRunTest: (testCaseId: string) => void;
  showExpectedOutput: boolean;
  toggleExpectedOutput: (testCaseId: string) => void;
  isDarkMode: boolean;
  index: number;
}) => (
  <Card
    className={`mb-4 ${
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}
  >
    <CardHeader className="pb-2 px-3 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardTitle
          className={`text-xs md:text-sm ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Test Case {index + 1}
        </CardTitle>
        <div className="flex items-center gap-2">
          {testCase.isCorrect !== null && (
            <Badge
              className={
                testCase.isCorrect
                  ? isDarkMode
                    ? "bg-green-900/60 text-green-300"
                    : "bg-green-100 text-green-700"
                  : isDarkMode
                  ? "bg-red-900/60 text-red-300"
                  : "bg-red-100 text-red-700"
              }
            >
              {testCase.isCorrect ? (
                <Check className="w-3 h-3 mr-1" />
              ) : (
                <X className="w-3 h-3 mr-1" />
              )}
              {testCase.isCorrect ? "Passed" : "Failed"}
            </Badge>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => onRunTest(testCase.id)}
            className={`h-7 px-2 text-xs ${
              isDarkMode ? "border-gray-700" : ""
            }`}
          >
            <Play className="w-3 h-3 mr-1" /> Run
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent className="py-2 px-3 space-y-3">
      <div>
        <h4
          className={`text-xs font-medium mb-1 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Input:
        </h4>
        <div
          className={`p-2 rounded-md font-mono text-xs overflow-x-auto whitespace-nowrap ${
            isDarkMode
              ? "bg-gray-900 text-gray-300"
              : "bg-gray-50 border border-gray-200 text-gray-700"
          }`}
        >
          {JSON.stringify(testCase.input)}
        </div>
      </div>

      {testCase.output && (
        <div>
          <h4
            className={`text-xs font-medium mb-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Your Output:
          </h4>
          <div
            className={`p-2 rounded-md font-mono text-xs overflow-x-auto whitespace-nowrap ${
              isDarkMode
                ? "bg-gray-900 text-gray-300"
                : "bg-gray-50 border border-gray-200 text-gray-700"
            }`}
          >
            {JSON.stringify(testCase.output)}
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-1">
          <h4
            className={`text-xs font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Expected Output:
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleExpectedOutput(testCase.id)}
            className={`h-6 text-xs p-0 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {showExpectedOutput ? (
              <EyeOff className="h-3 w-3 mr-1" />
            ) : (
              <Eye className="h-3 w-3 mr-1" />
            )}
            {showExpectedOutput ? "Hide" : "Show"}
          </Button>
        </div>

        {showExpectedOutput && (
          <div
            className={`p-2 rounded-md font-mono text-xs overflow-x-auto whitespace-nowrap ${
              isDarkMode
                ? "bg-gray-900 text-gray-300"
                : "bg-gray-50 border border-gray-200 text-gray-700"
            }`}
          >
            {JSON.stringify(testCase.expectedOutput)}
          </div>
        )}
      </div>

      {testCase.executionTime !== null &&
        typeof testCase.executionTime === "number" && (
          <div className="flex items-center text-xs mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              {testCase.executionTime.toFixed(2)} ms
            </span>
          </div>
        )}
    </CardContent>
  </Card>
);

// Result display component
const ResultDisplay = ({
  problemId,
  testCases,
  onRunTest,
  onRunAllTests,
  onRegenerateTestCases,
  showExpectedOutput,
  toggleExpectedOutput,
  isDarkMode,
}: {
  problemId: string;
  testCases: TestCase[];
  onRunTest: (testCaseId: string) => void;
  onRunAllTests: () => void;
  onRegenerateTestCases: () => void;
  showExpectedOutput: Record<string, boolean>;
  toggleExpectedOutput: (testCaseId: string) => void;
  isDarkMode: boolean;
}) => {
  // Calculate summary statistics
  const totalTests = testCases.length;
  const attemptedTests = testCases.filter((tc) => tc.isCorrect !== null).length;
  const passedTests = testCases.filter((tc) => tc.isCorrect === true).length;

  const allPassed = attemptedTests === totalTests && passedTests === totalTests;
  const someAttempted = attemptedTests > 0;

  return (
    <div className="flex flex-col h-full">
      <div
        className={`p-3 ${isDarkMode ? "bg-gray-800" : "bg-white"} border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
          <h3
            className={`font-medium text-sm ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Test Cases
          </h3>
          <div className="flex items-center gap-2">
            {someAttempted && (
              <Badge
                className={
                  allPassed
                    ? isDarkMode
                      ? "bg-green-900/60 text-green-300"
                      : "bg-green-100 text-green-700"
                    : isDarkMode
                    ? "bg-amber-900/60 text-amber-300"
                    : "bg-amber-100 text-amber-700"
                }
              >
                {passedTests}/{totalTests} Passed
              </Badge>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={onRegenerateTestCases}
              className={`h-7 text-xs px-2 text-black ${
                isDarkMode ? "border-gray-700" : ""
              }`}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              New
            </Button>
          </div>
        </div>
        <Button
          onClick={onRunAllTests}
          size="sm"
          className={`w-full ${
            isDarkMode
              ? "bg-amber-700 hover:bg-amber-600 text-white"
              : "bg-amber-600 hover:bg-amber-700 text-white"
          }`}
        >
          Run All Tests
        </Button>
      </div>

      <ScrollArea
        className={`flex-grow p-3 h-full w-full ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {testCases.map((testCase, index) => (
          <TestCaseItem
            key={testCase.id}
            testCase={testCase}
            onRunTest={onRunTest}
            showExpectedOutput={showExpectedOutput[testCase.id] || false}
            toggleExpectedOutput={toggleExpectedOutput}
            isDarkMode={isDarkMode}
            index={index}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

const CodeAssessmentContent: React.FC<CodeAssessmentProps> = ({
  isDarkMode = false,
}) => {
  // Define problem templates with test case generators
  const problemTemplates: Problem[] = [
    {
      id: "problem-1",
      title: "Basic Bubble Sort",
      difficulty: "easy",
      description:
        "Implement the Basic Bubble Sort algorithm for the given input array",
      inputFormat:
        "Input consists of an array of unsorted numbers - inp1. It may be of arbitrary length.",
      outputFormat: "An array of numbers sorted in ascending order",
      defaultCode: `/* Change only the function func
@params:
  inp1 = array of numbers to sort
*/
const func = (inp1) => {
  // Implement basic bubble sort
  return 'hello world'
}`,
      testCases: [],
      generateRandomTestCase: () => {
        const id = `test-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 5)}`;
        const input = generateRandomArray(
          Math.floor(Math.random() * 5) + 5,
          100
        );
        const expectedOutput = sortNumbers(input);
        return { id, input, expectedOutput };
      },
    },
    {
      id: "problem-2",
      title: "Optimized Bubble Sort",
      difficulty: "intermediate",
      description:
        "Implement Optimized Bubble Sort algorithm for the given input array",
      inputFormat:
        "Input consists of an array of unsorted numbers - inp1. It may be of arbitrary length.",
      outputFormat: "An array of numbers sorted in ascending order",
      defaultCode: `/* Change only the function func
@params:
  inp1 = array of numbers to sort
*/
const func = (inp1) => {
  // Implement optimized bubble sort (stops early if array is sorted)
  return 'hello world'
}`,
      testCases: [],
      generateRandomTestCase: () => {
        const id = `test-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 5)}`;
        const input = generateRandomArray(
          Math.floor(Math.random() * 10) + 10,
          500
        );
        const expectedOutput = sortNumbers(input);
        return { id, input, expectedOutput };
      },
    },
  ];

  // Generate initial problems with test cases
  const generateProblems = () => {
    return problemTemplates.map((problem) => ({
      ...problem,
      testCases: Array(3)
        .fill(null)
        .map(() => problem.generateRandomTestCase()),
    }));
  };

  const [problems, setProblems] = useState<Problem[]>(generateProblems);
  const [activeTab, setActiveTab] = useState("problem-1");
  const [code, setCode] = useState<Record<string, string>>({
    "problem-1": problemTemplates[0].defaultCode,
    "problem-2": problemTemplates[1].defaultCode,
  });
  const [showExpectedOutput, setShowExpectedOutput] = useState<
    Record<string, boolean>
  >({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeProblem = useMemo(
    () => problems.find((p) => p.id === activeTab) || problems[0],
    [activeTab, problems]
  );

  const handleCodeChange = useCallback(
    (value: string | undefined) => {
      if (value) {
        setCode((prev) => ({
          ...prev,
          [activeTab]: value,
        }));
      }
    },
    [activeTab]
  );

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const evaluateTestCase = useCallback(
    (problemId: string, testCaseId: string) => {
      try {
        // Find the problem and test case
        const problem = problems.find((p) => p.id === problemId);
        if (!problem) return;

        const testCaseIndex = problem.testCases.findIndex(
          (tc) => tc.id === testCaseId
        );
        if (testCaseIndex === -1) return;

        const testCase = problem.testCases[testCaseIndex];
        const userCode = code[problemId];

        // Parse the user's code to extract the function
        const funcStr = userCode.match(
          /const\s+func\s*=\s*\((.*?)\)\s*=>\s*{([\s\S]*?)return\s+([\s\S]*?);?\s*\}/
        );

        if (!funcStr) {
          // Update test case with error
          const updatedTestCase = {
            ...testCase,
            output: "Error: Could not parse function",
            isCorrect: false,
            executionTime: null,
          };

          const updatedProblems = [...problems];
          updatedProblems.find((p) => p.id === problemId)!.testCases[
            testCaseIndex
          ] = updatedTestCase;
          setProblems(updatedProblems);
          return;
        }

        // Start timing execution
        const startTime = performance.now();

        // eslint-disable-next-line no-new-func
        const userFunc = new Function(
          "input",
          `${userCode}; return func(input);`
        );

        // Run the test case
        const result = userFunc(testCase.input);

        // End timing execution
        const endTime = performance.now();
        const timeTaken = endTime - startTime;

        // Check if correct
        const isResultCorrect =
          JSON.stringify(result) === JSON.stringify(testCase.expectedOutput);

        // Update the test case with results
        const updatedTestCase = {
          ...testCase,
          output: result,
          isCorrect: isResultCorrect,
          executionTime: timeTaken,
        };

        // Update the problems state
        const updatedProblems = [...problems];
        updatedProblems.find((p) => p.id === problemId)!.testCases[
          testCaseIndex
        ] = updatedTestCase;
        setProblems(updatedProblems);

        // Show expected output if incorrect
        if (!isResultCorrect) {
          setShowExpectedOutput((prev) => ({
            ...prev,
            [testCaseId]: true,
          }));
        }
      } catch (error) {
        // Update the test case with error
        const problem = problems.find((p) => p.id === problemId);
        if (!problem) return;

        const testCaseIndex = problem.testCases.findIndex(
          (tc) => tc.id === testCaseId
        );
        if (testCaseIndex === -1) return;

        const updatedTestCase = {
          ...problem.testCases[testCaseIndex],
          output: `Error: ${(error as Error).message}`,
          isCorrect: false,
          executionTime: null,
        };

        const updatedProblems = [...problems];
        updatedProblems.find((p) => p.id === problemId)!.testCases[
          testCaseIndex
        ] = updatedTestCase;
        setProblems(updatedProblems);
      }
    },
    [code, problems]
  );

  const evaluateAllTestCases = useCallback(
    (problemId: string) => {
      const problem = problems.find((p) => p.id === problemId);
      if (!problem) return;

      problem.testCases.forEach((testCase) => {
        evaluateTestCase(problemId, testCase.id);
      });
    },
    [evaluateTestCase, problems]
  );

  const regenerateTestCases = useCallback(
    (problemId: string) => {
      const problem = problems.find((p) => p.id === problemId);
      if (!problem) return;

      // Generate new test cases
      const newTestCases = Array(3)
        .fill(null)
        .map(() => problem.generateRandomTestCase());

      // Update the problem with new test cases
      const updatedProblems = problems.map((p) =>
        p.id === problemId ? { ...p, testCases: newTestCases } : p
      );

      setProblems(updatedProblems);

      // Clear expected output visibility for new test cases
      const updatedShowExpectedOutput = { ...showExpectedOutput };
      problem.testCases.forEach((tc) => {
        delete updatedShowExpectedOutput[tc.id];
      });
      setShowExpectedOutput(updatedShowExpectedOutput);
    },
    [problems, showExpectedOutput]
  );

  const toggleExpectedOutput = useCallback((testCaseId: string) => {
    setShowExpectedOutput((prev) => ({
      ...prev,
      [testCaseId]: !prev[testCaseId],
    }));
  }, []);

  // Initialize with random test cases
  useEffect(() => {
    // This runs only on first render
    const initialProblems = generateProblems();
    setProblems(initialProblems);
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 w-full max-w-full overflow-hidden">
      <AssessmentHeader isDarkMode={isDarkMode} />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className={`w-full ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        } flex items-center`}
      >
        <TabsList
          className={`justify-start mb-4 md:mb-6 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          } overflow-x-auto`}
        >
          {problems.map((problem) => (
            <TabsTrigger
              key={problem.id}
              value={problem.id}
              className={`text-xs md:text-sm ${
                activeTab === problem.id
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-900"
                  : ""
              }`}
            >
              {problem.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {problems.map((problem) => (
          <TabsContent
            key={problem.id}
            value={problem.id}
            className="w-full space-y-4 md:space-y-6 animate-in fade-in-50 duration-300"
          >
            <ProblemDescription problem={problem} isDarkMode={isDarkMode} />

            <div
              className={
                isFullscreen
                  ? `fixed inset-0 z-50 p-4 ${
                      isDarkMode ? "bg-gray-900" : "bg-white"
                    }`
                  : ""
              }
            >
              {isFullscreen && (
                <div className="flex justify-end mb-2 text-black">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFullscreen}
                    className={isDarkMode ? "border-gray-700" : ""}
                  >
                    <Minimize2 className="h-4 w-4 mr-1" /> Exit Fullscreen
                  </Button>
                </div>
              )}

              <div
                className={`${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                } rounded-xl border overflow-hidden`}
              >
                {/* Mobile view - stacked layout */}
                <div className="block md:hidden">
                  <div className="h-[300px] flex flex-col">
                    <div
                      className={`flex items-center justify-between px-3 py-2 border-b ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-gray-200"
                          : "bg-gray-50 border-gray-200 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className={`flex items-center justify-center w-5 h-5 rounded-full ${
                            isDarkMode ? "bg-amber-700" : "bg-amber-400"
                          }`}
                        >
                          JS
                        </span>
                        <span className="text-xs">JavaScript</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={toggleFullscreen}
                            >
                              <Maximize2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Toggle fullscreen</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="h-full">
                      <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        language="javascript"
                        theme={isDarkMode ? "vs-dark" : "light"}
                        value={code[problem.id]}
                        onChange={handleCodeChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 12,
                          lineNumbers: "on",
                          renderLineHighlight: "all",
                          tabSize: 2,
                          autoIndent: "keep",
                          formatOnPaste: true,
                          formatOnType: true,
                          automaticLayout: true,
                        }}
                      />
                    </div>
                  </div>

                  <div className="h-[350px]">
                    <ResultDisplay
                      problemId={problem.id}
                      testCases={problem.testCases}
                      onRunTest={(testCaseId) =>
                        evaluateTestCase(problem.id, testCaseId)
                      }
                      onRunAllTests={() => evaluateAllTestCases(problem.id)}
                      onRegenerateTestCases={() =>
                        regenerateTestCases(problem.id)
                      }
                      showExpectedOutput={showExpectedOutput}
                      toggleExpectedOutput={toggleExpectedOutput}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>

                {/* Desktop view - side by side layout */}
                <div className="hidden md:block">
                  <ResizablePanelGroup
                    direction="horizontal"
                    className="min-h-[500px]"
                  >
                    <ResizablePanel defaultSize={60} minSize={40}>
                      <div className="h-full flex flex-col">
                        <div
                          className={`flex items-center justify-between px-4 py-2 border-b ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-gray-200"
                              : "bg-gray-50 border-gray-200 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span
                              className={`flex items-center justify-center w-5 h-5 rounded-full ${
                                isDarkMode ? "bg-amber-700" : "bg-amber-400"
                              }`}
                            >
                              JS
                            </span>
                            <span className="text-sm font-medium">
                              JavaScript
                            </span>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={toggleFullscreen}
                                >
                                  <Maximize2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Toggle fullscreen</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="h-[calc(100%-40px)]">
                          <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            language="javascript"
                            theme={isDarkMode ? "vs-dark" : "light"}
                            value={code[problem.id]}
                            onChange={handleCodeChange}
                            options={{
                              minimap: { enabled: true },
                              fontSize: 14,
                              lineNumbers: "on",
                              renderLineHighlight: "all",
                              tabSize: 2,
                              autoIndent: "keep",
                              formatOnPaste: true,
                              formatOnType: true,
                              automaticLayout: true,
                            }}
                          />
                        </div>
                      </div>
                    </ResizablePanel>

                    <ResizableHandle
                      withHandle
                      className={isDarkMode ? "bg-gray-700" : "bg-gray-200"}
                    />

                    <ResizablePanel defaultSize={40} minSize={30}>
                      <ResultDisplay
                        problemId={problem.id}
                        testCases={problem.testCases}
                        onRunTest={(testCaseId) =>
                          evaluateTestCase(problem.id, testCaseId)
                        }
                        onRunAllTests={() => evaluateAllTestCases(problem.id)}
                        onRegenerateTestCases={() =>
                          regenerateTestCases(problem.id)
                        }
                        showExpectedOutput={showExpectedOutput}
                        toggleExpectedOutput={toggleExpectedOutput}
                        isDarkMode={isDarkMode}
                      />
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeAssessmentContent;
