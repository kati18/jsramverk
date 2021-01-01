import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';

// const SOCKET_ENDPOINT = 'http://localhost:3000';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    providers: [ ChatService ]
})
export class ChatComponent implements OnInit, AfterViewChecked {
    hasJoinedChat = false;
    user: string;
    room: string; // ????
    messageText: string;
    timeStamp: object;
    // messages: string[] = []; // an array of strings?
    messages: object[] = []; // an array of objects?


    @ViewChild('messageContainer') private messageContainer: ElementRef;
    hasScrolledToBottom = false;

    constructor(private chatService: ChatService) {
        this.chatService.allMessagesReceived()
            .subscribe(data => this.messages = data);

        this.chatService.newUserJoined()
            .subscribe(data => this.messages.push(data));
            // alt below I think:
            // .subscribe((data) => {
            //     this.messages.push(data);
            // });

        this.chatService.userLeftRoom()
            .subscribe(data => this.messages.push(data));

        this.chatService.newMessegeReceived()
            .subscribe(data => this.messages.push(data));
    }

    // ngOnInit(): void {
    //     this.chatService.getAllMessages()
    //         .subscribe(data => this.messages = data);
    //
    // }

    ngOnInit(): void {
        this.chatService.getAllMessages();
    }

    join(): void {
        // console.log('this.room från join i chat.component.ts: ', this.room);
        // console.log('this.user från join i chat.component.ts: ', this.user);
        // this.messages = [];
        this.chatService.joinRoom({user: this.user, room: this.room});
        this.hasJoinedChat = true;
    }

    leave(): void {
        // console.log('this.room från leave i chat.component.ts: ', this.room);
        // console.log('this.user från leave i chat.component.ts: ', this.user);
        this.chatService.leaveRoom({user: this.user, room: this.room});
        this.hasJoinedChat = false;
    }

    sendMessage(): void {
        this.chatService.sendMessage({user: this.user, room: this.room, message: this.messageText});
        this.messageText = '';
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            if (!this.hasScrolledToBottom) {
                // console.log('är !this.hasScrolledToBottom true eller false: ', (!this.hasScrolledToBottom)); // true
                this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
            }
        } catch (err) { }
    }

    onScroll(): void {
        // let messConElement = this.messageContainer.nativeElement; // lint
        const messConElement = this.messageContainer.nativeElement;

        // The height of the element - the part of the element that is not viewable due to overflow ===
        // the viewable part of the element:
        // let atBottom = (messConElement.scrollHeight - messConElement.scrollTop) === messConElement.clientHeight; // lint
        const atBottom = (messConElement.scrollHeight - messConElement.scrollTop) === messConElement.clientHeight;

        // console.log('atBottom: ', atBottom); // true
        // console.log('Is this.hasScrolledToBottom true or false here? ', Boolean(this.hasScrolledToBottom)); // false
        // console.log('Is this.hasScrolledToBottom true or false here? ', (this.hasScrolledToBottom)); // false
        // console.log('messConElement.scrollHeight: ', messConElement.scrollHeight); // 360
        // console.log('messConElement.scrollTop: ', messConElement.scrollTop); // 30
        // console.log('messConElement.clientHeight: ', messConElement.clientHeight); // 330

        if (atBottom) {
            // console.log('(this.hasScrolledToBottom && atBottom): ', (this.hasScrolledToBottom && atBottom));
            this.hasScrolledToBottom = false;
        } else {
            this.hasScrolledToBottom = true;
        }
    }

}
