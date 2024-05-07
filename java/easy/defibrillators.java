import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Solution {

    private static double getDistance(double longitudeA,double longitudeB,double latitudeA,double latitudeB){
        Double x= (longitudeB-longitudeA)*Math.cos((latitudeA+latitudeB)/2);
        Double y=latitudeB-latitudeA;
        Double dist =Math.sqrt(Math.pow(x, 2)+Math.pow(y,2))*6371;
        return dist;
    }
    private static String getName(Double dist,Map <String, Double> map){
        String distt="";
        for (Map.Entry<String, Double> entry : map.entrySet()) {
            if(entry.getValue().equals(dist)){
                distt=entry.getKey();
            }
        }
        return distt;
    }
    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        Double LON = Math.toRadians(Double.parseDouble(in.next().replace(",",".")));
        Double LAT = Math.toRadians(Double.parseDouble(in.next().replace(",",".")));
        Map positions =new HashMap<String, Double>();
        int N = in.nextInt();
        if (in.hasNextLine()) {
            in.nextLine();
        }
        for (int i = 0; i < N; i++) {
            try{
                String DEFIB = in.nextLine();
                String name = DEFIB.split(";")[1];
                Double longitude=Math.toRadians(Double.parseDouble(
                    DEFIB.split(";")[DEFIB.split(";").length-2].replace(",", ".")
                ));
                Double latitude=Math.toRadians(Double.parseDouble(
                    DEFIB.split(";")[DEFIB.split(";").length-1].replace(",", ".")
                ));
                System.err.println("Defib has a name : "+name+ ",long : "+longitude +" and lat: " + latitude);
                //gttign the distance       
                Double dist = getDistance(LON, longitude, LAT, latitude);   
                positions.put(name, dist);
            }
            catch (Exception e){
                System.err.println(e);
            }
        }
        System.err.println("Positions : "+ positions);
        Double minDist= (Double)Collections.min(positions.values());
        String closestDef=getName(minDist,positions);
        System.out.println(closestDef);
    }
}