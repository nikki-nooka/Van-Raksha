import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createChatSession } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { BotIcon, SendIcon } from '../constants';
import Card from './ui/Card';
import Spinner from './ui/Spinner';
import type { Chat } from '@google/genai';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', sender: 'ai', text: "Hello! I am the VanRaksha Assistant. How can I help you with environmental science or disaster preparedness?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!chatSession.current) {
        chatSession.current = createChatSession();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatSession.current) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiMessageId, sender: 'ai', text: '' }]);

    try {
        const stream = await chatSession.current.sendMessageStream({ message: input });
        
        let fullResponse = '';
        for await (const chunk of stream) {
            fullResponse += chunk.text;
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessageId ? { ...msg, text: fullResponse } : msg
                )
            );
        }
    } catch (error) {
        console.error("Chat error:", error);
        setMessages(prev =>
            prev.map(msg =>
                msg.id === aiMessageId ? { ...msg, text: "Sorry, I encountered an error. Please try again." } : msg
            )
        );
    } finally {
        setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <Card className="flex flex-col flex-grow w-full h-[60vh] max-h-[700px] shadow-2xl">
      <div className="flex-shrink-0 p-4 border-b border-slate-200">
        <h3 className="font-bold text-lg text-slate-800">VanRaksha Assistant</h3>
      </div>
      <div className="flex-grow p-4 overflow-y-auto bg-slate-50/50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              {message.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white">
                    <BotIcon className="w-5 h-5" />
                </div>
              )}
              <div className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm ${message.sender === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-200'}`}>
                <div className="whitespace-pre-wrap">{message.text}</div>
                 {isLoading && message.sender === 'ai' && index === messages.length - 1 && !message.text && (
                    <div className="flex justify-center items-center p-2">
                        <Spinner size="sm" className="text-slate-500"/>
                    </div>
                 )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-slate-200 bg-white rounded-b-xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full bg-slate-100 text-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 border-none placeholder-slate-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            aria-label="Send message"
          >
            {isLoading ? <Spinner /> : <SendIcon className="w-5 h-5"/>}
          </button>
        </form>
      </div>
    </Card>
  );
};

export default Chatbot;
