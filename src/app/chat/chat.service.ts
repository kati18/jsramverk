import { Injectable } from '@angular/core';
// Import of the client library of Socket.IO. The library loads on the browser:
import { io } from 'socket.io-client';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })

export class ChatService {
    // Below to be used when developing locally:
    // private socket = io('http://localhost:3000');
    // Below to be used on production server i e on Debian:
    private socket = io('https://socket-server.ktibe.me');

    constructor() { }

    getAllMessages(): void {
        this.socket.emit('getAllMessages');
    }

    allMessagesReceived(): any {
        // let observable = new Observable<{user: string, message: string}>(observer => { // lint
        const observable = new Observable<{user: string, message: object}>(observer => {
          this.socket.on('all messages', (data) => {
            observer.next(data);
          });
          return () => {this.socket.disconnect(); };
        });

        return observable;
    }


    joinRoom(data): void {
        this.socket.emit('join', data);
    }

    newUserJoined(): any {
        // let observable = new Observable<{user: string, message: string}>(observer => { // lint
        const observable = new Observable<{user: string, message: string}>(observer => {
          this.socket.on('new user joined', (data) => {
            observer.next(data);
          });
          return () => {this.socket.disconnect(); };
        });

        return observable;
    }

    leaveRoom(data): void {
        this.socket.emit('leave', data);
    }

    userLeftRoom(): any {
        // let observable = new Observable<{user: string, message: string}>(observer => { // lint
        const observable = new Observable<{user: string, message: string}>(observer => {
          this.socket.on('left room', (data) => {
            observer.next(data);
          });
          return () => {this.socket.disconnect(); };
        });

        return observable;
    }

    sendMessage(data): void {
        this.socket.emit('message', data);
    }

    newMessegeReceived(): any {
        // let observable = new Observable<{user: string, message: string}>(observer => { // lint
        const observable = new Observable<{user: string, message: string}>(observer => {
          this.socket.on('new-message', (data) => {
            observer.next(data);
          });
          return () => {this.socket.disconnect(); };
        });

        return observable;
    }

}
