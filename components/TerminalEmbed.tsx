'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

export default function TerminalEmbed() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current || terminalInstance.current) return;

    const term = new Terminal({
      theme: {
        background: '#0a0a0a',
        foreground: '#00ff41',
        cursor: '#00ff41',
        cursorAccent: '#0a0a0a',
        selectionBackground: '#00ff4133',
        black: '#0a0a0a',
        red: '#ff3333',
        green: '#00ff41',
        yellow: '#facc15',
        blue: '#3b82f6',
        magenta: '#a855f7',
        cyan: '#06b6d4',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#ff6666',
        brightGreen: '#33ff66',
        brightYellow: '#ffdd57',
        brightBlue: '#6699ff',
        brightMagenta: '#c084fc',
        brightCyan: '#22d3ee',
        brightWhite: '#ffffff',
      },
      fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
      fontSize: 14,
      cursorBlink: true,
      cursorStyle: 'block',
      rows: 30,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    terminalInstance.current = term;

    term.writeln('\x1b[32m╔══════════════════════════════════════════════════════╗\x1b[0m');
    term.writeln('\x1b[32m║\x1b[0m  \x1b[1;33mSILVERBACKAI\x1b[0m // \x1b[1;32mTERMINAL ONLINE\x1b[0m                   \x1b[32m║\x1b[0m');
    term.writeln('\x1b[32m║\x1b[0m  \x1b[90mNorCal CARB Mobile — Tactical Operations\x1b[0m          \x1b[32m║\x1b[0m');
    term.writeln('\x1b[32m╚══════════════════════════════════════════════════════╝\x1b[0m');
    term.writeln('');
    term.writeln('\x1b[90m  Status: \x1b[32mSYSTEM READY\x1b[0m');
    term.writeln('\x1b[90m  Operator: \x1b[37mBryan Gillis\x1b[0m');
    term.writeln('\x1b[90m  License: \x1b[37mIF530523\x1b[0m');
    term.writeln('');
    term.writeln('\x1b[33m  ⚠ WebSocket connection not configured.\x1b[0m');
    term.writeln('\x1b[90m  To connect to your VM terminal:\x1b[0m');
    term.writeln('\x1b[90m  1. Set up a WebSocket server on your GCP VM\x1b[0m');
    term.writeln('\x1b[90m  2. Update the connection URL below\x1b[0m');
    term.writeln('');

    // TODO: Replace with your VM's WebSocket URL
    // Example: const ws = new WebSocket('wss://YOUR_VM_IP:PORT/terminal');
    // ws.onmessage = (event) => term.write(event.data);
    // term.onData((data) => ws.send(data));

    let commandBuffer = '';
    const prompt = '\x1b[32msilverback@ops\x1b[0m:\x1b[34m~\x1b[0m$ ';

    term.write(prompt);

    term.onData((data) => {
      if (data === '\r') {
        term.writeln('');
        const cmd = commandBuffer.trim();
        if (cmd === 'help') {
          term.writeln('\x1b[33mAvailable commands:\x1b[0m');
          term.writeln('  help     - Show this help message');
          term.writeln('  status   - Show system status');
          term.writeln('  clear    - Clear the terminal');
          term.writeln('  whoami   - Show current operator');
          term.writeln('');
          term.writeln('\x1b[90mNote: Full shell access requires WebSocket connection to VM.\x1b[0m');
        } else if (cmd === 'status') {
          term.writeln('\x1b[32m■\x1b[0m Command Center: \x1b[32mONLINE\x1b[0m');
          term.writeln('\x1b[33m■\x1b[0m VM Terminal:    \x1b[33mNOT CONNECTED\x1b[0m');
          term.writeln('\x1b[32m■\x1b[0m API Routes:     \x1b[32mACTIVE\x1b[0m');
        } else if (cmd === 'clear') {
          term.clear();
        } else if (cmd === 'whoami') {
          term.writeln('Bryan Gillis — NorCal CARB Mobile — License IF530523');
        } else if (cmd) {
          term.writeln(`\x1b[31mCommand not found: ${cmd}\x1b[0m`);
          term.writeln('\x1b[90mType "help" for available commands. Full shell requires VM WebSocket.\x1b[0m');
        }
        commandBuffer = '';
        term.write(prompt);
      } else if (data === '\x7f') {
        if (commandBuffer.length > 0) {
          commandBuffer = commandBuffer.slice(0, -1);
          term.write('\b \b');
        }
      } else if (data >= ' ') {
        commandBuffer += data;
        term.write(data);
      }
    });

    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
      terminalInstance.current = null;
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border-b border-gray-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-500 font-mono ml-2">
          silverback-terminal — bash
        </span>
      </div>
      <div
        ref={terminalRef}
        className="xterm-container p-2"
        style={{ height: 'calc(100vh - 280px)' }}
      />
    </div>
  );
}
