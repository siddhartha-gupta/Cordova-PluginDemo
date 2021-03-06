//
//  FileDownloader.m
//  
//
//  Created by Siddhartha Gupta on 07/12/14.
//
//

#import "FileDownloader.h"
#import <sys/xattr.h>

@implementation FileDownloader

- (void)addSkipBackupAttributeToPath:(NSString*)path {
    u_int8_t b = 1;
    setxattr([path fileSystemRepresentation], "com.apple.MobileBackup", &b, 1, 0, 0);
}

-(void) downloadFile:(CDVInvokedUrlCommand*)command {
    NSString * sourceUrl = [command.arguments objectAtIndex:0];
    NSString * fileName = [command.arguments objectAtIndex:1];
    NSString * directoryName = [command.arguments objectAtIndex:2];
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult* pluginResult;
        NSData* theData = [NSData dataWithContentsOfURL: [NSURL URLWithString:sourceUrl] ];
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES);
        NSString *libraryDirectory = [paths objectAtIndex:0];
        NSString *newDir = [libraryDirectory stringByAppendingPathComponent:directoryName];
        NSString *newFilePath = [newDir stringByAppendingString:[NSString stringWithFormat: @"/%@", fileName]];
        NSError *error=[[NSError alloc]init];
        
        BOOL response = NO;
        if ([[NSFileManager defaultManager] fileExistsAtPath:newDir]) {
            response = [theData writeToFile:newFilePath options:0 error:&error];
        } else {
            if ([[NSFileManager defaultManager] createDirectoryAtPath:newDir withIntermediateDirectories:YES attributes:nil error: NULL]) {
                response = [theData writeToFile:newFilePath options:0 error:&error];
                [self addSkipBackupAttributeToPath:newFilePath];
            }
        }

        if (response == NO) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[error description]];
        } else {
            NSMutableDictionary * output = [[NSMutableDictionary alloc] init];
            [output setObject:sourceUrl forKey:@"sourceUrl"];
            [output setObject:fileName forKey:@"fileName"];
            [output setObject:directoryName forKey:@"directoryName"];
            [output setObject:newFilePath forKey:@"newFilePath"];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:output];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

@end
