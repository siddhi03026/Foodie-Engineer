import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { FlavorButton } from "@/components/ui/FlavorButton";
import { Bot, User, Send, Loader2 } from "lucide-react";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  options?: string[];
}

const Chat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: "bot", content: "👋 What do you want to cook today?" }
  ]);

  const [input, setInput] = useState("");
  const [dish, setDish] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch Recipe Safely
  const fetchRecipe = async (title: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/recipe/ingredients?title=${encodeURIComponent(title)}`
      );
      return await res.json();
    } catch (error) {
      return { success: false };
    }
  };

  // Replace Ingredient Safely
  const replaceIngredient = async (message: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/replace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      return await res.json();
    } catch (error) {
      return { success: false };
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages(prev => [
      ...prev,
      { id: Date.now(), type: "user", content: userText }
    ]);

    setIsTyping(true);

    // =========================
    // STEP 1 → Fetch Recipe
    // =========================
    if (!dish) {
      const recipeRes = await fetchRecipe(userText);

      if (!recipeRes?.success || !recipeRes?.payload) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "bot",
            content: "❌ Sorry, I couldn’t find this dish."
          }
        ]);
        setIsTyping(false);
        return;
      }

      setDish(userText);

      const recipe = recipeRes.payload;

      const ingredients =
        recipe.ingredients?.map((i: any) => `• ${i.name}`).join("\n") ||
        "No ingredients found.";

      const instructions =
        recipe.instructions?.map((s: string) => `• ${s}`).join("\n") ||
        "No instructions found.";

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "bot",
          content: `🍽️ ${recipe.Recipe_title}

Calories: ${recipe.Calories || "N/A"}
Time: ${recipe.total_time || "N/A"} mins
Servings: ${recipe.servings || "N/A"}

Ingredients:
${ingredients}

Instructions:
${instructions}`
        },
        {
          id: Date.now() + 3,
          type: "bot",
          content: "Do you want to substitute any ingredient?",
          options: ["Yes", "No"]
        }
      ]);

      setIsTyping(false);
      return;
    }

    // =========================
    // STEP 2 → Replace Ingredient
    // =========================
    const replaceRes = await replaceIngredient(
      `Replace ${userText} in ${dish}`
    );

    if (replaceRes?.success && replaceRes?.modification) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 4,
          type: "bot",
          content: `✅ Suggested Replacement

Replace "${replaceRes.modification.originalIngredient}" 
with "${replaceRes.modification.suggestedReplacement}"

Flavor similarity: ${replaceRes.modification.flavorSimilarityScore || "N/A"}

🧠 ${replaceRes.explanation || ""}`
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 5,
          type: "bot",
          content: "❌ No suitable substitute found."
        }
      ]);
    }

    setIsTyping(false);
  };

  const handleOptionClick = (option: string) => {
    if (option === "No") navigate("/");
    if (option === "Yes") {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          type: "bot",
          content: "Which ingredient would you like to substitute?"
        }
      ]);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl h-[calc(100vh-5rem)] flex flex-col p-4">
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 mb-4 ${
                  msg.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white">
                  {msg.type === "bot" ? <Bot size={18} /> : <User size={18} />}
                </div>

                <div className="bg-card p-3 rounded-xl max-w-[80%] whitespace-pre-line text-sm">
                  {msg.content}

                  {msg.options && (
                    <div className="mt-3 flex gap-2">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="px-4 py-1 border rounded-full text-xs hover:bg-muted"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center">
                <Bot />
                <Loader2 className="animate-spin" />
              </div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2 mt-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type here..."
            className="flex-1 border rounded-lg p-3 text-sm"
          />
          <FlavorButton onClick={sendMessage}>
            <Send />
          </FlavorButton>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;